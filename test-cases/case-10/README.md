# Case 10 — GDS Advance Search (PriceRBD) · 2 Adults

| Field | Value |
|-------|-------|
| Type | GDS Advance Search / PriceRBD |
| Route | DEL → BOM |
| Date | 2026-06-15 |
| Cabin | Economy |
| Passengers | 2 Adults |
| Airline | Air India (AI) — Non-LCC |
| Flow | Authenticate → **Search (JT=4)** → **PriceRBD** → FareRule → FareQuote → Book → Ticket → GetBookingDetails |

> **Advance Search (JourneyType=4)**: Returns results grouped by fare class/RBD.
> After selecting a result, call PriceRBD to get the exact fare for the chosen RBD.
> The ResultIndex returned from PriceRBD replaces the Search ResultIndex for FareRule/FareQuote.

---

## Step 1 — Authenticate

```json
{ "ClientId": "ApiIntegrationNew", "UserName": "<<TBO_USERNAME>>", "Password": "<<TBO_PASSWORD>>", "EndUserIp": "1.1.1.1" }
```

---

## Step 2 — Advance Search (JourneyType 4)

```json
{
  "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1",
  "AdultCount": "2", "ChildCount": "0", "InfantCount": "0",
  "DirectFlight": "false", "OneStopFlight": "false",
  "JourneyType": "4", "PreferredAirlines": null,
  "Segments": [
    { "Origin": "DEL", "Destination": "BOM", "FlightCabinClass": "2",
      "PreferredDepartureTime": "2026-06-15T00:00:00",
      "PreferredArrivalTime": "2026-06-15T00:00:00" }
  ],
  "Sources": null
}
```

> Capture: `Response.TraceId` → `<<TRACE_ID>>`
> Select Air India Non-LCC result. Capture `ResultIndex` → `<<SEARCH_RESULT_INDEX>>`
> Also capture the `RBD` (fare class letter) from the result → `<<RBD>>`

---

## Step 3 — PriceRBD

**POST** `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/PriceRBD`

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "ResultIndex": "<<SEARCH_RESULT_INDEX>>",
  "TraceId": "<<TRACE_ID>>"
}
```

> Response returns a new ResultIndex priced at the specific RBD.
> Capture: `Response.Results.ResultIndex` → `<<RBD_RESULT_INDEX>>`
> Capture: refreshed `Response.TraceId` → `<<RBD_TRACE_ID>>`
> Use `<<RBD_RESULT_INDEX>>` and `<<RBD_TRACE_ID>>` for all subsequent calls.

---

## Step 4 — FareRule

```json
{ "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1", "ResultIndex": "<<RBD_RESULT_INDEX>>", "TraceId": "<<RBD_TRACE_ID>>" }
```

---

## Step 5 — FareQuote

```json
{ "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1", "ResultIndex": "<<RBD_RESULT_INDEX>>", "TraceId": "<<RBD_TRACE_ID>>" }
```

> Capture: `Response.TraceId` → `<<FQ_TRACE_ID>>`, `IsLCC` (should be false for GDS)

---

## Step 6 — Book

```json
{
  "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1",
  "ResultIndex": "<<RBD_RESULT_INDEX>>", "TraceId": "<<FQ_TRACE_ID>>",
  "Passengers": [
    {
      "Title": "Mr", "FirstName": "RAHUL", "LastName": "SHARMA",
      "PaxType": 1, "DateOfBirth": "1985-03-15T00:00:00", "Gender": 1,
      "PassportNo": "", "PassportExpiry": "2030-01-01T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "rahul.sharma@example.com", "ContactNo": "9810001234",
      "IsLeadPax": true,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "", "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Fare": { "Currency": "INR", "BaseFare": "<<FareBreakdown[ADT].BaseFare / 2>>", "Tax": "<<FareBreakdown[ADT].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[ADT].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0, "OtherCharges": 0, "ChargeBU": [],
        "Discount": 0, "PublishedFare": 0, "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0, "TdsOnIncentive": 0, "ServiceFee": 0 }
    },
    {
      "Title": "Mr", "FirstName": "AMIT", "LastName": "KUMAR",
      "PaxType": 1, "DateOfBirth": "1982-11-08T00:00:00", "Gender": 1,
      "PassportNo": "", "PassportExpiry": "2030-01-01T00:00:00",
      "AddressLine1": "12 Connaught Place", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "", "ContactNo": "", "IsLeadPax": false,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "", "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Fare": { "Currency": "INR", "BaseFare": "<<FareBreakdown[ADT].BaseFare / 2>>", "Tax": "<<FareBreakdown[ADT].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[ADT].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0, "OtherCharges": 0, "ChargeBU": [],
        "Discount": 0, "PublishedFare": 0, "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0, "TdsOnIncentive": 0, "ServiceFee": 0 }
    }
  ]
}
```

---

## Step 7 — Ticket

```json
{ "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1", "BookingId": "<<BOOKING_ID>>" }
```

---

## Step 8 — GetBookingDetails

```json
{ "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1", "BookingId": "<<BOOKING_ID>>" }
```

---

## Case Summary

| Field | Value |
|-------|-------|
| Search ResultIndex | |
| PriceRBD ResultIndex | |
| TraceId (Search) | |
| TraceId (PriceRBD) | |
| TraceId (FareQuote) | |
| PNR | |
| BookingId | |
| Ticket Numbers | |

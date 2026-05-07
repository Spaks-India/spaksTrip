# Case 08 — GDS Multiway · 2 Adults

| Field | Value |
|-------|-------|
| Type | GDS / Non-LCC Multiway |
| Route | DEL → BOM → MAA |
| Leg 1 Date | 2026-06-15 |
| Leg 2 Date | 2026-06-20 |
| Cabin | Economy |
| Passengers | 2 Adults |
| Airline | Air India (AI) |
| Flow | Authenticate → Search (JT=3) → FareRule → FareQuote → Book → Ticket → GetBookingDetails |

> **Multiway (JourneyType=3)**: Three or more segments. TBO returns a combined itinerary.
> The Search `Segments` array contains each leg. One ResultIndex covers all legs.
> Non-LCC flow: Book step required before Ticket.

---

## Step 1 — Authenticate

```json
{ "ClientId": "ApiIntegrationNew", "UserName": "<<TBO_USERNAME>>", "Password": "<<TBO_PASSWORD>>", "EndUserIp": "1.1.1.1" }
```

---

## Step 2 — Search (JourneyType 3 = Multi-Stop)

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "AdultCount": "2",
  "ChildCount": "0",
  "InfantCount": "0",
  "DirectFlight": "false",
  "OneStopFlight": "false",
  "JourneyType": "3",
  "PreferredAirlines": null,
  "Segments": [
    {
      "Origin": "DEL",
      "Destination": "BOM",
      "FlightCabinClass": "2",
      "PreferredDepartureTime": "2026-06-15T00:00:00",
      "PreferredArrivalTime": "2026-06-15T00:00:00"
    },
    {
      "Origin": "BOM",
      "Destination": "MAA",
      "FlightCabinClass": "2",
      "PreferredDepartureTime": "2026-06-20T00:00:00",
      "PreferredArrivalTime": "2026-06-20T00:00:00"
    }
  ],
  "Sources": null
}
```

> Select Air India (AI), Non-LCC. Capture: `Response.TraceId` → `<<TRACE_ID>>`, `ResultIndex` → `<<RESULT_INDEX>>`

---

## Step 3 — FareRule

```json
{ "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1", "ResultIndex": "<<RESULT_INDEX>>", "TraceId": "<<TRACE_ID>>" }
```

---

## Step 4 — FareQuote

```json
{ "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1", "ResultIndex": "<<RESULT_INDEX>>", "TraceId": "<<TRACE_ID>>" }
```

> Capture: `Response.TraceId` → `<<FQ_TRACE_ID>>`

---

## Step 5 — Book

```json
{
  "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1",
  "ResultIndex": "<<RESULT_INDEX>>", "TraceId": "<<FQ_TRACE_ID>>",
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
      "Fare": { "Currency": "INR",
        "BaseFare": "<<FareBreakdown[ADT].BaseFare / 2>>", "Tax": "<<FareBreakdown[ADT].Tax / 2>>",
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
      "Fare": { "Currency": "INR",
        "BaseFare": "<<FareBreakdown[ADT].BaseFare / 2>>", "Tax": "<<FareBreakdown[ADT].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[ADT].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0, "OtherCharges": 0, "ChargeBU": [],
        "Discount": 0, "PublishedFare": 0, "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0, "TdsOnIncentive": 0, "ServiceFee": 0 }
    }
  ]
}
```

> Capture: `BookingId` → `<<BOOKING_ID>>`, `PNR` → `<<PNR>>`

---

## Step 6 — Ticket

```json
{ "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1", "BookingId": "<<BOOKING_ID>>" }
```

---

## Step 7 — GetBookingDetails

```json
{ "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1", "BookingId": "<<BOOKING_ID>>" }
```

---

## Case Summary

| Field | Value |
|-------|-------|
| ResultIndex | |
| TraceId (Search) | |
| TraceId (FareQuote) | |
| PNR | |
| BookingId | |
| Ticket Numbers | |

# Case 09 — Domestic Oneway + Air Fare Calendar · 2 Adults

| Field | Value |
|-------|-------|
| Type | GDS Domestic Oneway (via Calendar Fare) |
| Route | DEL → BOM |
| Month | 2026-06 |
| Booking Date | Lowest-fare day from calendar |
| Cabin | Economy |
| Passengers | 2 Adults |
| Airline | Any (select best-fare result) |
| Flow | Authenticate → **GetCalendarFare** → **UpdateCalendarFareOfDay** → Search → FareRule → FareQuote → Book/Ticket → GetBookingDetails |

> Calendar Fare is a **pre-search** step to show monthly fare overview.
> After identifying the lowest-fare date, proceed with standard booking flow.
> Calendar fare only works for **domestic Indian routes**.

---

## Step 1 — Authenticate

```json
{ "ClientId": "ApiIntegrationNew", "UserName": "<<TBO_USERNAME>>", "Password": "<<TBO_PASSWORD>>", "EndUserIp": "1.1.1.1" }
```

---

## Step 2 — GetCalendarFare

**POST** `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/GetCalendarFare`

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "AdultCount": "2",
  "ChildCount": "0",
  "InfantCount": "0",
  "DirectFlight": "false",
  "OneStopFlight": "false",
  "JourneyType": "1",
  "PreferredAirlines": null,
  "Segments": [
    {
      "Origin": "DEL",
      "Destination": "BOM",
      "FlightCabinClass": "2",
      "PreferredDepartureTime": "2026-06-01T00:00:00",
      "PreferredArrivalTime": "2026-06-01T00:00:00"
    }
  ],
  "Sources": null
}
```

> Response contains `SearchResults[]` — array of daily fares for the month.
> Look for `IsLowestFareOfMonth: true` to find the best day.
> Capture: lowest-fare date → `<<BEST_DATE>>` (e.g. "2026-06-15")

---

## Step 3 — UpdateCalendarFareOfDay (real-time refresh for selected date)

**POST** `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/UpdateCalendarFareOfDay`

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "AdultCount": "2",
  "ChildCount": "0",
  "InfantCount": "0",
  "DirectFlight": "false",
  "OneStopFlight": "false",
  "JourneyType": "1",
  "PreferredAirlines": null,
  "Segments": [
    {
      "Origin": "DEL",
      "Destination": "BOM",
      "FlightCabinClass": "2",
      "PreferredDepartureTime": "<<BEST_DATE>>T00:00:00",
      "PreferredArrivalTime": "<<BEST_DATE>>T00:00:00"
    }
  ],
  "Sources": null
}
```

---

## Step 4 — Search (for the selected best date)

```json
{
  "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1",
  "AdultCount": "2", "ChildCount": "0", "InfantCount": "0",
  "DirectFlight": "false", "OneStopFlight": "false",
  "JourneyType": "1", "PreferredAirlines": null,
  "Segments": [
    { "Origin": "DEL", "Destination": "BOM", "FlightCabinClass": "2",
      "PreferredDepartureTime": "<<BEST_DATE>>T00:00:00",
      "PreferredArrivalTime": "<<BEST_DATE>>T00:00:00" }
  ],
  "Sources": null
}
```

> Capture: `Response.TraceId` → `<<TRACE_ID>>`, `ResultIndex` → `<<RESULT_INDEX>>`

---

## Step 5 — FareRule

```json
{ "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1", "ResultIndex": "<<RESULT_INDEX>>", "TraceId": "<<TRACE_ID>>" }
```

---

## Step 6 — FareQuote

```json
{ "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1", "ResultIndex": "<<RESULT_INDEX>>", "TraceId": "<<TRACE_ID>>" }
```

> Capture: `IsLCC`, `Response.TraceId` → `<<FQ_TRACE_ID>>`

---

## Step 7 — Book (if Non-LCC) or skip to Ticket (if LCC)

**Non-LCC Book:**
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

## Step 8 — Ticket

**Non-LCC:** `{ "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1", "BookingId": "<<BOOKING_ID>>" }`

**LCC:**
```json
{
  "PreferredCurrency": "INR", "IsBaseCurrencyRequired": "true",
  "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1",
  "TraceId": "<<FQ_TRACE_ID>>", "ResultIndex": "<<RESULT_INDEX>>",
  "Passengers": [ ... same as Book Passengers above ... ]
}
```

---

## Step 9 — GetBookingDetails

```json
{ "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1", "BookingId": "<<BOOKING_ID>>" }
```

---

## Case Summary

| Field | Value |
|-------|-------|
| Best-fare date from calendar | |
| ResultIndex | |
| TraceId (Search) | |
| TraceId (FareQuote) | |
| IsLCC | |
| PNR | |
| BookingId | |
| Ticket Numbers | |

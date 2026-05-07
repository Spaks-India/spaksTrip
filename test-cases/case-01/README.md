# Case 01 — GDS Domestic Oneway · 1 Adult

| Field | Value |
|-------|-------|
| Type | GDS / Non-LCC |
| Route | DEL → BOM |
| Date | 2026-06-15 |
| Cabin | Economy |
| Passengers | 1 Adult |
| Airline | Air India (AI) — select any AI result from Search |
| Flow | Authenticate → Search → FareRule → FareQuote → Book → Ticket → GetBookingDetails |

---

## Step 1 — Authenticate

**POST** `https://sharedapi.tektravels.com/SharedData.svc/rest/Authenticate`

```json
{
  "ClientId": "ApiIntegrationNew",
  "UserName": "<<TBO_USERNAME>>",
  "Password": "<<TBO_PASSWORD>>",
  "EndUserIp": "1.1.1.1"
}
```

> Capture: `Response.TokenAgentDetails.TokenId` → use as `<<TOKEN>>` for all subsequent calls.
> Token is valid until 23:59:59 today. **Do not re-authenticate mid-booking.**

---

## Step 2 — Search

**POST** `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Search`

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "AdultCount": "1",
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
      "PreferredDepartureTime": "2026-06-15T00:00:00",
      "PreferredArrivalTime": "2026-06-15T00:00:00"
    }
  ],
  "Sources": null
}
```

> Capture: `Response.TraceId` → `<<TRACE_ID>>`
> Select an **Air India (AI)** result where `IsLCC = false`.
> Capture its `ResultIndex` → `<<RESULT_INDEX>>`

---

## Step 3 — FareRule

**POST** `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/FareRule`

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "ResultIndex": "<<RESULT_INDEX>>",
  "TraceId": "<<TRACE_ID>>"
}
```

---

## Step 4 — FareQuote

**POST** `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/FareQuote`

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "ResultIndex": "<<RESULT_INDEX>>",
  "TraceId": "<<TRACE_ID>>"
}
```

> Capture: `Response.TraceId` (refreshed) → `<<FQ_TRACE_ID>>`
> Capture: `Response.Results.IsLCC` (must be `false` for GDS)
> Capture: `Response.Results.IsGSTMandatory`
> Capture: `Response.Results.FareBreakdown[]` → compute per-pax fare for Book/Ticket:
>   `BaseFare = FareBreakdown[ADT].BaseFare / PassengerCount`
>   `Tax = FareBreakdown[ADT].Tax / PassengerCount`

---

## Step 5 — Book (Non-LCC required)

**POST** `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Book`

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "ResultIndex": "<<RESULT_INDEX>>",
  "TraceId": "<<FQ_TRACE_ID>>",
  "Passengers": [
    {
      "Title": "Mr",
      "FirstName": "RAHUL",
      "LastName": "SHARMA",
      "PaxType": 1,
      "DateOfBirth": "1985-03-15T00:00:00",
      "Gender": 1,
      "PassportNo": "",
      "PassportExpiry": "2030-01-01T00:00:00",
      "AddressLine1": "45 Prithviraj Road",
      "City": "New Delhi",
      "CountryCode": "IN",
      "CountryName": "India",
      "Nationality": "IN",
      "Email": "rahul.sharma@example.com",
      "ContactNo": "9810001234",
      "IsLeadPax": true,
      "GSTCompanyAddress": "",
      "GSTCompanyContactNumber": "",
      "GSTCompanyName": "",
      "GSTNumber": "",
      "GSTCompanyEmail": "",
      "Fare": {
        "Currency": "INR",
        "BaseFare": "<<FareBreakdown[ADT].BaseFare / 1>>",
        "Tax": "<<FareBreakdown[ADT].Tax / 1>>",
        "TaxBreakup": [],
        "YQTax": "<<FareBreakdown[ADT].YQTax / 1>>",
        "AdditionalTxnFeeOfrd": 0,
        "AdditionalTxnFeePub": 0,
        "PGCharge": 0,
        "OtherCharges": 0,
        "ChargeBU": [],
        "Discount": 0,
        "PublishedFare": 0,
        "CommissionEarned": 0,
        "PLBEarned": 0,
        "IncentiveEarned": 0,
        "OfferedFare": 0,
        "TdsOnCommission": 0,
        "TdsOnPLB": 0,
        "TdsOnIncentive": 0,
        "ServiceFee": 0
      }
    }
  ]
}
```

> Capture: `Response.FlightItinerary.BookingId` → `<<BOOKING_ID>>`
> Capture: `Response.FlightItinerary.PNR` → `<<PNR>>`

---

## Step 6 — Ticket (Non-LCC)

**POST** `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Ticket`

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "BookingId": "<<BOOKING_ID>>"
}
```

> Capture: `Response.FlightItinerary.Passenger[0].Ticket.TicketNumber` → `<<TICKET_NUMBER>>`
> Capture: `Response.FlightItinerary.BookingStatus` (must be 1 = Confirmed)

---

## Step 7 — GetBookingDetails

**POST** `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/GetBookingDetails`

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "BookingId": "<<BOOKING_ID>>"
}
```

---

## Case Summary (fill before submission)

| Field | Value |
|-------|-------|
| ResultIndex used | |
| TraceId from Search | |
| TraceId from FareQuote | |
| PNR | |
| BookingId | |
| Ticket Number | |
| Booking Status | |

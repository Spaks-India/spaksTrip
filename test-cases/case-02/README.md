# Case 02 — LCC Domestic Oneway · 1A + 1C + 1I · With SSR

| Field | Value |
|-------|-------|
| Type | LCC |
| Route | DEL → BOM |
| Date | 2026-06-15 |
| Cabin | Economy |
| Passengers | 1 Adult + 1 Child + 1 Infant |
| Airline | IndiGo (6E) — select any 6E result from Search |
| Flow | Authenticate → Search → FareRule → FareQuote → **SSR** → **Ticket** → GetBookingDetails |

> **LCC rule**: No Book step. Ticket is called directly with ResultIndex + Passengers.
> SSR (Baggage, MealDynamic) must be passed as **arrays** in Ticket request.
> Infant may only receive Meal SSR — no Baggage or Seat.

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

---

## Step 2 — Search

**POST** `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Search`

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "AdultCount": "1",
  "ChildCount": "1",
  "InfantCount": "1",
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

> Select an **IndiGo (6E)** result where `IsLCC = true`.
> Capture: `Response.TraceId` → `<<TRACE_ID>>`, selected `ResultIndex` → `<<RESULT_INDEX>>`

---

## Step 3 — FareRule

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

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "ResultIndex": "<<RESULT_INDEX>>",
  "TraceId": "<<TRACE_ID>>"
}
```

> Capture: `Response.TraceId` → `<<FQ_TRACE_ID>>`
> Confirm `IsLCC = true`
> Capture `FareBreakdown[]` for ADT (PaxType 1), CHD (PaxType 2), INF (PaxType 3)

---

## Step 5 — SSR (Optional but required for this case)

**POST** `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/SSR`

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "ResultIndex": "<<RESULT_INDEX>>",
  "TraceId": "<<FQ_TRACE_ID>>"
}
```

> From response, select one option each for:
> - ADT Baggage → capture `Code`, `Weight`, `Price`, `Origin`, `Destination`, `AirlineCode`, `FlightNumber`, `WayType`
> - ADT MealDynamic → capture `Code`, `AirlineDescription`, `Price`, `Origin`, `Destination`, `AirlineCode`, `FlightNumber`
> - CHD Baggage and MealDynamic → same fields
> - INF MealDynamic **only** (no Baggage for Infant)

---

## Step 6 — Ticket (LCC — direct, no Book step)

**POST** `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Ticket`

```json
{
  "PreferredCurrency": "INR",
  "IsBaseCurrencyRequired": "true",
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "TraceId": "<<FQ_TRACE_ID>>",
  "ResultIndex": "<<RESULT_INDEX>>",
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
      },
      "Baggage": [
        {
          "Code": "<<SSR.Baggage[ADT][0].Code>>",
          "Weight": "<<SSR.Baggage[ADT][0].Weight>>",
          "Price": "<<SSR.Baggage[ADT][0].Price>>",
          "Currency": "INR",
          "Origin": "<<SSR.Baggage[ADT][0].Origin>>",
          "Destination": "<<SSR.Baggage[ADT][0].Destination>>",
          "AirlineCode": "<<SSR.Baggage[ADT][0].AirlineCode>>",
          "FlightNumber": "<<SSR.Baggage[ADT][0].FlightNumber>>",
          "WayType": "<<SSR.Baggage[ADT][0].WayType>>",
          "Description": 0
        }
      ],
      "MealDynamic": [
        {
          "Code": "<<SSR.MealDynamic[ADT][0].Code>>",
          "AirlineDescription": "<<SSR.MealDynamic[ADT][0].AirlineDescription>>",
          "Price": "<<SSR.MealDynamic[ADT][0].Price>>",
          "Currency": "INR",
          "Origin": "<<SSR.MealDynamic[ADT][0].Origin>>",
          "Destination": "<<SSR.MealDynamic[ADT][0].Destination>>",
          "AirlineCode": "<<SSR.MealDynamic[ADT][0].AirlineCode>>",
          "FlightNumber": "<<SSR.MealDynamic[ADT][0].FlightNumber>>",
          "WayType": 1,
          "Quantity": 1,
          "Description": 0
        }
      ],
      "SeatDynamic": []
    },
    {
      "Title": "Mstr",
      "FirstName": "ROHAN",
      "LastName": "SHARMA",
      "PaxType": 2,
      "DateOfBirth": "2017-05-10T00:00:00",
      "Gender": 1,
      "PassportNo": "",
      "PassportExpiry": "2030-01-01T00:00:00",
      "AddressLine1": "45 Prithviraj Road",
      "City": "New Delhi",
      "CountryCode": "IN",
      "CountryName": "India",
      "Nationality": "IN",
      "Email": "",
      "ContactNo": "",
      "IsLeadPax": false,
      "GSTCompanyAddress": "",
      "GSTCompanyContactNumber": "",
      "GSTCompanyName": "",
      "GSTNumber": "",
      "GSTCompanyEmail": "",
      "Fare": {
        "Currency": "INR",
        "BaseFare": "<<FareBreakdown[CHD].BaseFare / 1>>",
        "Tax": "<<FareBreakdown[CHD].Tax / 1>>",
        "TaxBreakup": [],
        "YQTax": "<<FareBreakdown[CHD].YQTax / 1>>",
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
      },
      "Baggage": [
        {
          "Code": "<<SSR.Baggage[CHD][0].Code>>",
          "Weight": "<<SSR.Baggage[CHD][0].Weight>>",
          "Price": "<<SSR.Baggage[CHD][0].Price>>",
          "Currency": "INR",
          "Origin": "<<SSR.Baggage[CHD][0].Origin>>",
          "Destination": "<<SSR.Baggage[CHD][0].Destination>>",
          "AirlineCode": "<<SSR.Baggage[CHD][0].AirlineCode>>",
          "FlightNumber": "<<SSR.Baggage[CHD][0].FlightNumber>>",
          "WayType": "<<SSR.Baggage[CHD][0].WayType>>",
          "Description": 0
        }
      ],
      "MealDynamic": [
        {
          "Code": "<<SSR.MealDynamic[CHD][0].Code>>",
          "AirlineDescription": "<<SSR.MealDynamic[CHD][0].AirlineDescription>>",
          "Price": "<<SSR.MealDynamic[CHD][0].Price>>",
          "Currency": "INR",
          "Origin": "<<SSR.MealDynamic[CHD][0].Origin>>",
          "Destination": "<<SSR.MealDynamic[CHD][0].Destination>>",
          "AirlineCode": "<<SSR.MealDynamic[CHD][0].AirlineCode>>",
          "FlightNumber": "<<SSR.MealDynamic[CHD][0].FlightNumber>>",
          "WayType": 1,
          "Quantity": 1,
          "Description": 0
        }
      ],
      "SeatDynamic": []
    },
    {
      "Title": "Mstr",
      "FirstName": "KABIR",
      "LastName": "SHARMA",
      "PaxType": 3,
      "DateOfBirth": "2025-01-20T00:00:00",
      "Gender": 1,
      "PassportNo": "",
      "PassportExpiry": "2030-01-01T00:00:00",
      "AddressLine1": "45 Prithviraj Road",
      "City": "New Delhi",
      "CountryCode": "IN",
      "CountryName": "India",
      "Nationality": "IN",
      "Email": "",
      "ContactNo": "",
      "IsLeadPax": false,
      "GSTCompanyAddress": "",
      "GSTCompanyContactNumber": "",
      "GSTCompanyName": "",
      "GSTNumber": "",
      "GSTCompanyEmail": "",
      "Fare": {
        "Currency": "INR",
        "BaseFare": "<<FareBreakdown[INF].BaseFare / 1>>",
        "Tax": "<<FareBreakdown[INF].Tax / 1>>",
        "TaxBreakup": [],
        "YQTax": "<<FareBreakdown[INF].YQTax / 1>>",
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

> **Infant (PaxType 3) has no Baggage / SeatDynamic fields at all — omit them entirely.**
> Capture: `Response.FlightItinerary.BookingId` → `<<BOOKING_ID>>`
> Capture: ticket numbers from `Response.FlightItinerary.Passenger[].Ticket.TicketNumber`

---

## Step 7 — GetBookingDetails

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "BookingId": "<<BOOKING_ID>>"
}
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
| ADT Ticket No. | |
| CHD Ticket No. | |
| INF Ticket No. | |
| Booking Status | |

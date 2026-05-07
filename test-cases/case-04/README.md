# Case 04 — LCC International Oneway · 1A + 1C + 1I · With SSR

| Field | Value |
|-------|-------|
| Type | LCC International |
| Route | DEL → DXB |
| Date | 2026-07-01 |
| Cabin | Economy |
| Passengers | 1 Adult + 1 Child + 1 Infant |
| Airline | SpiceJet (SG) or IndiGo (6E) international — select LCC result |
| Flow | Authenticate → Search → FareRule → FareQuote → **SSR** → **Ticket** → GetBookingDetails |

> **International rule**: Passport details are **mandatory** for all passengers (Adult, Child, Infant).
> DOB is mandatory for Child and Infant.
> LCC: no Book step; Ticket directly with passengers and SSR arrays.

---

## Step 1 — Authenticate

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
      "Destination": "DXB",
      "FlightCabinClass": "2",
      "PreferredDepartureTime": "2026-07-01T00:00:00",
      "PreferredArrivalTime": "2026-07-01T00:00:00"
    }
  ],
  "Sources": null
}
```

> Select an LCC result (`IsLCC = true`) — e.g. SpiceJet (SG) or IndiGo (6E).
> Capture: `Response.TraceId` → `<<TRACE_ID>>`, `ResultIndex` → `<<RESULT_INDEX>>`

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
> Capture: `FareBreakdown[]` for ADT, CHD, INF

---

## Step 5 — SSR

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "ResultIndex": "<<RESULT_INDEX>>",
  "TraceId": "<<FQ_TRACE_ID>>"
}
```

> Select one Baggage and one MealDynamic option for ADT and CHD from response.
> For INF: select one MealDynamic only (no Baggage).

---

## Step 6 — Ticket (LCC International)

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
      "PassportNo": "Z1234567",
      "PassportExpiry": "2030-12-31T00:00:00",
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
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0,
        "OtherCharges": 0, "ChargeBU": [], "Discount": 0, "PublishedFare": 0,
        "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0,
        "TdsOnIncentive": 0, "ServiceFee": 0
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
          "WayType": 1, "Quantity": 1, "Description": 0
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
      "PassportNo": "Z5555555",
      "PassportExpiry": "2030-12-31T00:00:00",
      "AddressLine1": "45 Prithviraj Road",
      "City": "New Delhi",
      "CountryCode": "IN",
      "CountryName": "India",
      "Nationality": "IN",
      "Email": "", "ContactNo": "", "IsLeadPax": false,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "",
      "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Fare": {
        "Currency": "INR",
        "BaseFare": "<<FareBreakdown[CHD].BaseFare / 1>>",
        "Tax": "<<FareBreakdown[CHD].Tax / 1>>",
        "TaxBreakup": [],
        "YQTax": "<<FareBreakdown[CHD].YQTax / 1>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0,
        "OtherCharges": 0, "ChargeBU": [], "Discount": 0, "PublishedFare": 0,
        "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0,
        "TdsOnIncentive": 0, "ServiceFee": 0
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
          "WayType": 1, "Quantity": 1, "Description": 0
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
      "PassportNo": "Z9999999",
      "PassportExpiry": "2030-12-31T00:00:00",
      "AddressLine1": "45 Prithviraj Road",
      "City": "New Delhi",
      "CountryCode": "IN",
      "CountryName": "India",
      "Nationality": "IN",
      "Email": "", "ContactNo": "", "IsLeadPax": false,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "",
      "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Fare": {
        "Currency": "INR",
        "BaseFare": "<<FareBreakdown[INF].BaseFare / 1>>",
        "Tax": "<<FareBreakdown[INF].Tax / 1>>",
        "TaxBreakup": [],
        "YQTax": "<<FareBreakdown[INF].YQTax / 1>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0,
        "OtherCharges": 0, "ChargeBU": [], "Discount": 0, "PublishedFare": 0,
        "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0,
        "TdsOnIncentive": 0, "ServiceFee": 0
      }
    }
  ]
}
```

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
| Ticket Numbers | |
| Booking Status | |

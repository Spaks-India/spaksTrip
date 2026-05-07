# Case 11 — NDC International Oneway · 2A + 2C · With SSR

| Field | Value |
|-------|-------|
| Type | NDC International Oneway |
| Route | DEL → LHR |
| Date | 2026-07-01 |
| Cabin | Economy |
| Passengers | 2 Adults + 2 Children |
| Airline | Air India NDC (AI) — select NDC result |
| Flow | Authenticate → Search → FareRule → FareQuote → **SSR** → **Ticket** → GetBookingDetails |

> **NDC results** appear alongside GDS results in Search. Look for results where `IsNDC = true` or prefixed "NDC" in ResultIndex.
> NDC may behave like LCC (IsLCC=true) — confirm from FareQuote response.
> **If IsLCC=true**: Use LCC flow (Ticket direct, SSR as arrays).
> **If IsLCC=false**: Use Non-LCC flow (Book then Ticket, SSR as objects).
> Passport mandatory for all passengers (international).
> DOB mandatory for all Children.

---

## Step 1 — Authenticate

```json
{ "ClientId": "ApiIntegrationNew", "UserName": "<<TBO_USERNAME>>", "Password": "<<TBO_PASSWORD>>", "EndUserIp": "1.1.1.1" }
```

---

## Step 2 — Search

```json
{
  "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1",
  "AdultCount": "2", "ChildCount": "2", "InfantCount": "0",
  "DirectFlight": "false", "OneStopFlight": "false",
  "JourneyType": "1", "PreferredAirlines": null,
  "Segments": [
    { "Origin": "DEL", "Destination": "LHR", "FlightCabinClass": "2",
      "PreferredDepartureTime": "2026-07-01T00:00:00",
      "PreferredArrivalTime": "2026-07-01T00:00:00" }
  ],
  "Sources": null
}
```

> Identify an Air India NDC result from the response.
> Capture: `Response.TraceId` → `<<TRACE_ID>>`, NDC `ResultIndex` → `<<RESULT_INDEX>>`

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

> Capture: `IsLCC` → determine NDC booking flow.
> Capture: `Response.TraceId` → `<<FQ_TRACE_ID>>`
> Capture: `FareBreakdown[]` for ADT (×2), CHD (×2)

---

## Step 5 — SSR

```json
{ "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1", "ResultIndex": "<<RESULT_INDEX>>", "TraceId": "<<FQ_TRACE_ID>>" }
```

> If NDC IsLCC=true: select Baggage and MealDynamic arrays for ADT and CHD.
> If NDC IsLCC=false: select meal/seat preference codes.

---

## Step 6 — Ticket (LCC/NDC path — no Book step)

```json
{
  "PreferredCurrency": "INR",
  "IsBaseCurrencyRequired": "true",
  "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1",
  "TraceId": "<<FQ_TRACE_ID>>",
  "ResultIndex": "<<RESULT_INDEX>>",
  "Passengers": [
    {
      "Title": "Mr", "FirstName": "RAHUL", "LastName": "SHARMA",
      "PaxType": 1, "DateOfBirth": "1985-03-15T00:00:00", "Gender": 1,
      "PassportNo": "Z1234567", "PassportExpiry": "2030-12-31T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "rahul.sharma@example.com", "ContactNo": "9810001234",
      "IsLeadPax": true,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "", "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Fare": { "Currency": "INR", "BaseFare": "<<FareBreakdown[ADT].BaseFare / 2>>", "Tax": "<<FareBreakdown[ADT].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[ADT].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0, "OtherCharges": 0, "ChargeBU": [],
        "Discount": 0, "PublishedFare": 0, "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0, "TdsOnIncentive": 0, "ServiceFee": 0 },
      "Baggage": [ { "Code": "<<SSR.Baggage[ADT][0].Code>>", "Weight": "<<weight>>", "Price": "<<price>>",
        "Currency": "INR", "Origin": "DEL", "Destination": "LHR",
        "AirlineCode": "AI", "FlightNumber": "<<flight>>", "WayType": 1, "Description": 0 } ],
      "MealDynamic": [ { "Code": "<<SSR.MealDynamic[ADT][0].Code>>", "AirlineDescription": "<<desc>>",
        "Price": "<<price>>", "Currency": "INR", "Origin": "DEL", "Destination": "LHR",
        "AirlineCode": "AI", "FlightNumber": "<<flight>>", "WayType": 1, "Quantity": 1, "Description": 0 } ],
      "SeatDynamic": []
    },
    {
      "Title": "Mrs", "FirstName": "PRIYA", "LastName": "SHARMA",
      "PaxType": 1, "DateOfBirth": "1988-07-22T00:00:00", "Gender": 2,
      "PassportNo": "Z7654321", "PassportExpiry": "2030-06-30T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "", "ContactNo": "", "IsLeadPax": false,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "", "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Fare": { "Currency": "INR", "BaseFare": "<<FareBreakdown[ADT].BaseFare / 2>>", "Tax": "<<FareBreakdown[ADT].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[ADT].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0, "OtherCharges": 0, "ChargeBU": [],
        "Discount": 0, "PublishedFare": 0, "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0, "TdsOnIncentive": 0, "ServiceFee": 0 },
      "Baggage": [ { "Code": "<<SSR.Baggage[ADT][0].Code>>", "Weight": "<<weight>>", "Price": "<<price>>",
        "Currency": "INR", "Origin": "DEL", "Destination": "LHR",
        "AirlineCode": "AI", "FlightNumber": "<<flight>>", "WayType": 1, "Description": 0 } ],
      "MealDynamic": [ { "Code": "<<SSR.MealDynamic[ADT][0].Code>>", "AirlineDescription": "<<desc>>",
        "Price": "<<price>>", "Currency": "INR", "Origin": "DEL", "Destination": "LHR",
        "AirlineCode": "AI", "FlightNumber": "<<flight>>", "WayType": 1, "Quantity": 1, "Description": 0 } ],
      "SeatDynamic": []
    },
    {
      "Title": "Mstr", "FirstName": "ROHAN", "LastName": "SHARMA",
      "PaxType": 2, "DateOfBirth": "2017-05-10T00:00:00", "Gender": 1,
      "PassportNo": "Z5555555", "PassportExpiry": "2030-12-31T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "", "ContactNo": "", "IsLeadPax": false,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "", "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Fare": { "Currency": "INR", "BaseFare": "<<FareBreakdown[CHD].BaseFare / 2>>", "Tax": "<<FareBreakdown[CHD].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[CHD].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0, "OtherCharges": 0, "ChargeBU": [],
        "Discount": 0, "PublishedFare": 0, "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0, "TdsOnIncentive": 0, "ServiceFee": 0 },
      "Baggage": [ { "Code": "<<SSR.Baggage[CHD][0].Code>>", "Weight": "<<weight>>", "Price": "<<price>>",
        "Currency": "INR", "Origin": "DEL", "Destination": "LHR",
        "AirlineCode": "AI", "FlightNumber": "<<flight>>", "WayType": 1, "Description": 0 } ],
      "MealDynamic": [ { "Code": "<<SSR.MealDynamic[CHD][0].Code>>", "AirlineDescription": "<<desc>>",
        "Price": "<<price>>", "Currency": "INR", "Origin": "DEL", "Destination": "LHR",
        "AirlineCode": "AI", "FlightNumber": "<<flight>>", "WayType": 1, "Quantity": 1, "Description": 0 } ],
      "SeatDynamic": []
    },
    {
      "Title": "Miss", "FirstName": "RIYA", "LastName": "SHARMA",
      "PaxType": 2, "DateOfBirth": "2016-08-20T00:00:00", "Gender": 2,
      "PassportNo": "Z6666666", "PassportExpiry": "2030-12-31T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "", "ContactNo": "", "IsLeadPax": false,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "", "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Fare": { "Currency": "INR", "BaseFare": "<<FareBreakdown[CHD].BaseFare / 2>>", "Tax": "<<FareBreakdown[CHD].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[CHD].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0, "OtherCharges": 0, "ChargeBU": [],
        "Discount": 0, "PublishedFare": 0, "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0, "TdsOnIncentive": 0, "ServiceFee": 0 },
      "Baggage": [ { "Code": "<<SSR.Baggage[CHD][0].Code>>", "Weight": "<<weight>>", "Price": "<<price>>",
        "Currency": "INR", "Origin": "DEL", "Destination": "LHR",
        "AirlineCode": "AI", "FlightNumber": "<<flight>>", "WayType": 1, "Description": 0 } ],
      "MealDynamic": [ { "Code": "<<SSR.MealDynamic[CHD][0].Code>>", "AirlineDescription": "<<desc>>",
        "Price": "<<price>>", "Currency": "INR", "Origin": "DEL", "Destination": "LHR",
        "AirlineCode": "AI", "FlightNumber": "<<flight>>", "WayType": 1, "Quantity": 1, "Description": 0 } ],
      "SeatDynamic": []
    }
  ]
}
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
| NDC ResultIndex | |
| IsLCC (from FareQuote) | |
| TraceId (Search) | |
| TraceId (FareQuote) | |
| PNR | |
| BookingId | |
| Ticket Numbers | |

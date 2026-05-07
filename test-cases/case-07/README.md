# Case 07 — GDS Domestic Special Return + SSR · 2A + 2C + 1I

| Field | Value |
|-------|-------|
| Type | GDS / Non-LCC Special Return |
| Route | DEL ↔ BOM |
| Outbound Date | 2026-06-15 |
| Return Date | 2026-06-22 |
| Cabin | Economy |
| Passengers | 2 Adults + 2 Children + 1 Infant |
| Airline | Air India (AI) — select Non-LCC result |
| Flow | Authenticate → Search (JT=5) → FareRule → FareQuote → SSR → Book → Ticket → GetBookingDetails |

> **GDS Special Return**: FareQuote with comma-separated `"OB_INDEX,IB_INDEX"` → single OB ResultIndex returned.
> One PNR. All SSR passed as **objects** (Non-LCC style), not arrays.
> Non-LCC SSR: Meal and Seat preference codes as `{ Code, Description }` objects on each passenger.

---

## Step 1 — Authenticate

```json
{ "ClientId": "ApiIntegrationNew", "UserName": "<<TBO_USERNAME>>", "Password": "<<TBO_PASSWORD>>", "EndUserIp": "1.1.1.1" }
```

---

## Step 2 — Search (JourneyType 5)

```json
{
  "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1",
  "AdultCount": "2", "ChildCount": "2", "InfantCount": "1",
  "DirectFlight": "false", "OneStopFlight": "false",
  "JourneyType": "5", "PreferredAirlines": null,
  "Segments": [
    { "Origin": "DEL", "Destination": "BOM", "FlightCabinClass": "2",
      "PreferredDepartureTime": "2026-06-15T00:00:00", "PreferredArrivalTime": "2026-06-15T00:00:00" },
    { "Origin": "BOM", "Destination": "DEL", "FlightCabinClass": "2",
      "PreferredDepartureTime": "2026-06-22T00:00:00", "PreferredArrivalTime": "2026-06-22T00:00:00" }
  ],
  "Sources": null
}
```

> Select Air India (AI) Non-LCC results. Capture OB → `<<OB_RESULT_INDEX>>`, IB → `<<IB_RESULT_INDEX>>`, TraceId → `<<TRACE_ID>>`

---

## Step 3 — FareRule (OB)

```json
{ "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1", "ResultIndex": "<<OB_RESULT_INDEX>>", "TraceId": "<<TRACE_ID>>" }
```

---

## Step 4 — FareQuote (comma-separated)

```json
{ "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1", "ResultIndex": "<<OB_RESULT_INDEX>>,<<IB_RESULT_INDEX>>", "TraceId": "<<TRACE_ID>>" }
```

> Capture: `Response.Results.ResultIndex` → `<<FQ_RESULT_INDEX>>`, `Response.TraceId` → `<<FQ_TRACE_ID>>`

---

## Step 5 — SSR (Non-LCC)

```json
{ "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1", "ResultIndex": "<<FQ_RESULT_INDEX>>", "TraceId": "<<FQ_TRACE_ID>>" }
```

> Non-LCC SSR response contains `MealPref[]` (static codes) and `SeatPref[]` (static codes).
> Select one meal code → `<<MEAL_CODE>>`, one seat code → `<<SEAT_CODE>>`

---

## Step 6 — Book (Non-LCC with SSR)

```json
{
  "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1",
  "ResultIndex": "<<FQ_RESULT_INDEX>>", "TraceId": "<<FQ_TRACE_ID>>",
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
      "Meal": { "Code": "<<MEAL_CODE>>", "Description": "<<MEAL_DESCRIPTION>>" },
      "Seat": { "Code": "<<SEAT_CODE>>", "Description": "<<SEAT_DESCRIPTION>>" },
      "Fare": { "Currency": "INR", "BaseFare": "<<FareBreakdown[ADT].BaseFare / 2>>", "Tax": "<<FareBreakdown[ADT].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[ADT].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0, "OtherCharges": 0, "ChargeBU": [],
        "Discount": 0, "PublishedFare": 0, "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0, "TdsOnIncentive": 0, "ServiceFee": 0 }
    },
    {
      "Title": "Mrs", "FirstName": "PRIYA", "LastName": "SHARMA",
      "PaxType": 1, "DateOfBirth": "1988-07-22T00:00:00", "Gender": 2,
      "PassportNo": "", "PassportExpiry": "2030-01-01T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "", "ContactNo": "", "IsLeadPax": false,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "", "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Meal": { "Code": "<<MEAL_CODE>>", "Description": "<<MEAL_DESCRIPTION>>" },
      "Seat": { "Code": "<<SEAT_CODE>>", "Description": "<<SEAT_DESCRIPTION>>" },
      "Fare": { "Currency": "INR", "BaseFare": "<<FareBreakdown[ADT].BaseFare / 2>>", "Tax": "<<FareBreakdown[ADT].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[ADT].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0, "OtherCharges": 0, "ChargeBU": [],
        "Discount": 0, "PublishedFare": 0, "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0, "TdsOnIncentive": 0, "ServiceFee": 0 }
    },
    {
      "Title": "Mstr", "FirstName": "ROHAN", "LastName": "SHARMA",
      "PaxType": 2, "DateOfBirth": "2017-05-10T00:00:00", "Gender": 1,
      "PassportNo": "", "PassportExpiry": "2030-01-01T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "", "ContactNo": "", "IsLeadPax": false,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "", "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Meal": { "Code": "<<MEAL_CODE>>", "Description": "<<MEAL_DESCRIPTION>>" },
      "Fare": { "Currency": "INR", "BaseFare": "<<FareBreakdown[CHD].BaseFare / 2>>", "Tax": "<<FareBreakdown[CHD].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[CHD].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0, "OtherCharges": 0, "ChargeBU": [],
        "Discount": 0, "PublishedFare": 0, "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0, "TdsOnIncentive": 0, "ServiceFee": 0 }
    },
    {
      "Title": "Miss", "FirstName": "RIYA", "LastName": "SHARMA",
      "PaxType": 2, "DateOfBirth": "2016-08-20T00:00:00", "Gender": 2,
      "PassportNo": "", "PassportExpiry": "2030-01-01T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "", "ContactNo": "", "IsLeadPax": false,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "", "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Meal": { "Code": "<<MEAL_CODE>>", "Description": "<<MEAL_DESCRIPTION>>" },
      "Fare": { "Currency": "INR", "BaseFare": "<<FareBreakdown[CHD].BaseFare / 2>>", "Tax": "<<FareBreakdown[CHD].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[CHD].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0, "OtherCharges": 0, "ChargeBU": [],
        "Discount": 0, "PublishedFare": 0, "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0, "TdsOnIncentive": 0, "ServiceFee": 0 }
    },
    {
      "Title": "Mstr", "FirstName": "KABIR", "LastName": "SHARMA",
      "PaxType": 3, "DateOfBirth": "2025-01-20T00:00:00", "Gender": 1,
      "PassportNo": "", "PassportExpiry": "2030-01-01T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "", "ContactNo": "", "IsLeadPax": false,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "", "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Meal": { "Code": "<<MEAL_CODE>>", "Description": "<<MEAL_DESCRIPTION>>" },
      "Fare": { "Currency": "INR", "BaseFare": "<<FareBreakdown[INF].BaseFare / 1>>", "Tax": "<<FareBreakdown[INF].Tax / 1>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[INF].YQTax / 1>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0, "OtherCharges": 0, "ChargeBU": [],
        "Discount": 0, "PublishedFare": 0, "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0, "TdsOnIncentive": 0, "ServiceFee": 0 }
    }
  ]
}
```

> Capture: `BookingId` → `<<BOOKING_ID>>`, `PNR` → `<<PNR>>`

---

## Step 7 — Ticket (Non-LCC)

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
| OB / IB ResultIndexes | |
| FQ ResultIndex | |
| TraceId (Search) | |
| TraceId (FareQuote) | |
| PNR | |
| BookingId | |
| Ticket Numbers | |

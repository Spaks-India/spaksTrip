# Case 05 — GDS International Return · 2A + 2C + 1I

| Field | Value |
|-------|-------|
| Type | GDS / Non-LCC International |
| Route | DEL ↔ LHR |
| Outbound Date | 2026-07-01 |
| Return Date | 2026-07-15 |
| Cabin | Economy |
| Passengers | 2 Adults + 2 Children + 1 Infant |
| Airline | Air India (AI) — select Non-LCC result |
| Flow | Authenticate → Search (JT=2) → FareRule → FareQuote → **Book** → **Ticket** → GetBookingDetails |

> **International Return (GDS)**: TBO returns a **single ResultIndex** containing both OB and IB segments — only one PNR is generated.
> Passport details mandatory for all passengers.
> GST fields must be included on lead passenger (use empty strings if IsGSTMandatory=false).

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

## Step 2 — Search (JourneyType 2 = Return)

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "AdultCount": "2",
  "ChildCount": "2",
  "InfantCount": "1",
  "DirectFlight": "false",
  "OneStopFlight": "false",
  "JourneyType": "2",
  "PreferredAirlines": null,
  "Segments": [
    {
      "Origin": "DEL",
      "Destination": "LHR",
      "FlightCabinClass": "2",
      "PreferredDepartureTime": "2026-07-01T00:00:00",
      "PreferredArrivalTime": "2026-07-01T00:00:00"
    },
    {
      "Origin": "LHR",
      "Destination": "DEL",
      "FlightCabinClass": "2",
      "PreferredDepartureTime": "2026-07-15T00:00:00",
      "PreferredArrivalTime": "2026-07-15T00:00:00"
    }
  ],
  "Sources": null
}
```

> International return: `Results[0][]` contains combined itineraries (OB+IB in one result).
> Select an Air India (AI) result where `IsLCC = false`.
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
> Note: `IsLCC` must be `false`; `IsGSTMandatory` value determines whether to populate GST fields.
> Capture `FareBreakdown[]` for ADT (×2), CHD (×2), INF (×1)

---

## Step 5 — Book (Non-LCC)

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "ResultIndex": "<<RESULT_INDEX>>",
  "TraceId": "<<FQ_TRACE_ID>>",
  "Passengers": [
    {
      "Title": "Mr", "FirstName": "RAHUL", "LastName": "SHARMA",
      "PaxType": 1, "DateOfBirth": "1985-03-15T00:00:00", "Gender": 1,
      "PassportNo": "Z1234567", "PassportExpiry": "2030-12-31T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "rahul.sharma@example.com", "ContactNo": "9810001234",
      "IsLeadPax": true,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "",
      "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Fare": {
        "Currency": "INR",
        "BaseFare": "<<FareBreakdown[ADT].BaseFare / 2>>",
        "Tax": "<<FareBreakdown[ADT].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[ADT].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0,
        "OtherCharges": 0, "ChargeBU": [], "Discount": 0, "PublishedFare": 0,
        "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0,
        "TdsOnIncentive": 0, "ServiceFee": 0
      }
    },
    {
      "Title": "Mrs", "FirstName": "PRIYA", "LastName": "SHARMA",
      "PaxType": 1, "DateOfBirth": "1988-07-22T00:00:00", "Gender": 2,
      "PassportNo": "Z7654321", "PassportExpiry": "2030-06-30T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "", "ContactNo": "", "IsLeadPax": false,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "",
      "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Fare": {
        "Currency": "INR",
        "BaseFare": "<<FareBreakdown[ADT].BaseFare / 2>>",
        "Tax": "<<FareBreakdown[ADT].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[ADT].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0,
        "OtherCharges": 0, "ChargeBU": [], "Discount": 0, "PublishedFare": 0,
        "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0,
        "TdsOnIncentive": 0, "ServiceFee": 0
      }
    },
    {
      "Title": "Mstr", "FirstName": "ROHAN", "LastName": "SHARMA",
      "PaxType": 2, "DateOfBirth": "2017-05-10T00:00:00", "Gender": 1,
      "PassportNo": "Z5555555", "PassportExpiry": "2030-12-31T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "", "ContactNo": "", "IsLeadPax": false,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "",
      "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Fare": {
        "Currency": "INR",
        "BaseFare": "<<FareBreakdown[CHD].BaseFare / 2>>",
        "Tax": "<<FareBreakdown[CHD].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[CHD].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0,
        "OtherCharges": 0, "ChargeBU": [], "Discount": 0, "PublishedFare": 0,
        "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0,
        "TdsOnIncentive": 0, "ServiceFee": 0
      }
    },
    {
      "Title": "Miss", "FirstName": "RIYA", "LastName": "SHARMA",
      "PaxType": 2, "DateOfBirth": "2016-08-20T00:00:00", "Gender": 2,
      "PassportNo": "Z6666666", "PassportExpiry": "2030-12-31T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "", "ContactNo": "", "IsLeadPax": false,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "",
      "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Fare": {
        "Currency": "INR",
        "BaseFare": "<<FareBreakdown[CHD].BaseFare / 2>>",
        "Tax": "<<FareBreakdown[CHD].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[CHD].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0,
        "OtherCharges": 0, "ChargeBU": [], "Discount": 0, "PublishedFare": 0,
        "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0,
        "TdsOnIncentive": 0, "ServiceFee": 0
      }
    },
    {
      "Title": "Mstr", "FirstName": "KABIR", "LastName": "SHARMA",
      "PaxType": 3, "DateOfBirth": "2025-01-20T00:00:00", "Gender": 1,
      "PassportNo": "Z9999999", "PassportExpiry": "2030-12-31T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "", "ContactNo": "", "IsLeadPax": false,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "",
      "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Fare": {
        "Currency": "INR",
        "BaseFare": "<<FareBreakdown[INF].BaseFare / 1>>",
        "Tax": "<<FareBreakdown[INF].Tax / 1>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[INF].YQTax / 1>>",
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

> Capture: `Response.FlightItinerary.BookingId` → `<<BOOKING_ID>>`, `PNR` → `<<PNR>>`

---

## Step 6 — Ticket (Non-LCC)

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "BookingId": "<<BOOKING_ID>>"
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
| PNR (single — international return) | |
| BookingId | |
| Ticket Numbers | |
| Booking Status | |

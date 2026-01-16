export default async function handler(req, res) {
  const { path } = req.query;
  const method = req.method;

  // Mock responses for Ninox API
  if (method === 'POST' && path.join('/') === 'Onboarding/record') {
    // This is the GET request, since it's POST with filters
    const email = req.body.filters?.U;
    if (email === 'test@example.com') {
      res.status(200).json({
        id: 'test-id',
        fields: {
          'FIRST NAME': 'Test',
          'MIDDLE NAME': '',
          'LAST NAME': 'User',
          'SOCIAL SECURITY NUMBER': '123456789',
          'Email': 'test@example.com',
          'BirthDay': '1990-01-01',
          'PHYSICAL_ADDRESS': '123 Test St',
          'PHYSICAL CITY STATE, ZIP CODE': 'Test City, TS 12345',
          'MailingAddress': '123 Test St',
          'MailingCityStateZip': 'Test City, TS 12345',
          'MailingSameAsPhys': true,
          'CellPhone': '555-123-4567',
          'HomePhone': '555-123-4567',
          'Sex': 'Male',
          'DriversLicenseNo': 'D1234567',
          'DriversLicenseState': 'TS',
          'HAS_FINALIZED_ONBOARDING_VIA_APP': false,
          'Dependents': [],
          'Medical Plan': 'Plan A',
          'CoverageSelected': 'Employee Only',
          'MedDentalVisionEmployee': 'Yes',
          'HealthConfirmCheckbox': false,
        }
      });
    } else {
      // For other emails, return not found or mock another user
      res.status(200).json({
        id: 'mock-id',
        fields: {
          'FIRST NAME': 'Mock',
          'LAST NAME': 'User',
          'SOCIAL SECURITY NUMBER': '987654321',
          'Email': email,
          'HAS_FINALIZED_ONBOARDING_VIA_APP': false,
          // Add other fields as needed
        }
      });
    }
  } else if (method === 'POST' && path.join('/') === 'Onboarding/records') {
    // PUT request
    res.status(200).json({ id: 'mock-id' });
  } else if (method === 'GET' && path.includes('files')) {
    // File requests
    res.status(200).send(Buffer.alloc(0)); // Empty file
  } else if (method === 'POST' && path.includes('files')) {
    // File upload
    res.status(200).json({});
  } else {
    res.status(200).json({});
  }
}
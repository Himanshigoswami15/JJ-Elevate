// End-to-end verification script for Neon PostgreSQL integration with JJ Elevate app

const BASE_URL = 'http://localhost:5173';

async function runE2E() {
  console.log('====================================================');
  console.log('🚀 STARTING END-TO-END NEON SERVICES VERIFICATION');
  console.log(`Target: ${BASE_URL}`);
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  // TEST 1: Health check
  try {
    console.log('👉 [1/5] Testing GET /api/health (Neon DB Health)...');
    const res = await fetch(`${BASE_URL}/api/health`);
    const data = await res.json();
    console.log('Response Status:', res.status);
    console.log('Response Body:', JSON.stringify(data, null, 2));

    if (res.ok && data.success && data.isConnected) {
      console.log('✅ PASSED: Neon Database is healthy and connected!\n');
      passed++;
    } else {
      console.error('❌ FAILED: Health check did not return isConnected: true\n');
      failed++;
    }
  } catch (err) {
    console.error('❌ FAILED: Health check request exception:', err.message, '\n');
    failed++;
  }

  // TEST 2: Read Site Content from Neon
  try {
    console.log('👉 [2/5] Testing GET /api/content (Read from Neon site_content table)...');
    const res = await fetch(`${BASE_URL}/api/content`);
    const data = await res.json();
    console.log('Response Status:', res.status);
    console.log('Has Content:', Boolean(data.content));
    console.log('Hero Headline:', data.content?.hero?.headlineAccent || 'N/A');
    console.log('Updated At:', data.updatedAt);

    if (res.ok && data.success && data.content) {
      console.log('✅ PASSED: Successfully fetched website content from Neon PostgreSQL!\n');
      passed++;
    } else {
      console.error('❌ FAILED: Could not read content from Neon site_content\n');
      failed++;
    }
  } catch (err) {
    console.error('❌ FAILED: Read content exception:', err.message, '\n');
    failed++;
  }

  // TEST 3: Update Site Content in Neon
  let originalHero = null;
  try {
    console.log('👉 [3/5] Testing POST /api/content (Write/Upsert to Neon site_content table)...');
    // Fetch current content first
    const getRes = await fetch(`${BASE_URL}/api/content`);
    const current = await getRes.json();
    originalHero = current.content?.hero;

    const testPayload = {
      ...current.content,
      hero: {
        ...current.content?.hero,
        badgeText: 'Trusted by 120+ Luxury Hotels & Resorts Worldwide (Neon Verified)'
      }
    };

    const postRes = await fetch(`${BASE_URL}/api/content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload)
    });
    const postData = await postRes.json();
    console.log('Response Status:', postRes.status);
    console.log('Response Body:', JSON.stringify(postData, null, 2));

    // Restore original badge text
    if (originalHero) {
      await fetch(`${BASE_URL}/api/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...testPayload,
          hero: originalHero
        })
      });
    }

    if (postRes.ok && postData.success) {
      console.log('✅ PASSED: Successfully wrote and updated site content in Neon PostgreSQL!\n');
      passed++;
    } else {
      console.error('❌ FAILED: Write to Neon site_content failed\n');
      failed++;
    }
  } catch (err) {
    console.error('❌ FAILED: Write content exception:', err.message, '\n');
    failed++;
  }

  // TEST 4: Submit Inquiry/Lead to Neon
  const testInquiryId = `test-inq-${Date.now()}`;
  try {
    console.log('👉 [4/5] Testing POST /api/contact (Insert Lead into Neon inquiries table)...');
    const leadPayload = {
      id: testInquiryId,
      name: 'Neon Automated Tester',
      email: 'neon.test@jjelevate.com',
      phone: '+91 99999 88888',
      company: 'Neon Cloud Verification Suite',
      service: 'High-Intent Google Ads & Performance Search',
      message: 'Automated end-to-end integration test verifying Neon PostgreSQL writes.'
    };

    const postRes = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadPayload)
    });
    const postData = await postRes.json();
    console.log('Response Status:', postRes.status);
    console.log('Response Body:', JSON.stringify(postData, null, 2));

    if (postRes.ok && postData.success && postData.leadId === testInquiryId) {
      console.log('✅ PASSED: Lead successfully inserted into Neon inquiries table!\n');
      passed++;
    } else {
      console.error('❌ FAILED: Insert into Neon inquiries failed\n');
      failed++;
    }
  } catch (err) {
    console.error('❌ FAILED: Insert lead exception:', err.message, '\n');
    failed++;
  }

  // TEST 5: Query Inquiries from Neon
  try {
    console.log('👉 [5/5] Testing GET /api/inquiries (Retrieve Leads from Neon inquiries table)...');
    const res = await fetch(`${BASE_URL}/api/inquiries`);
    const data = await res.json();
    console.log('Response Status:', res.status);
    console.log('Total inquiries returned:', data.inquiries?.length || 0);

    const foundTestLead = data.inquiries?.find(inq => inq.id === testInquiryId);
    console.log('Test Lead Found:', Boolean(foundTestLead));

    // Clean up test lead
    if (foundTestLead) {
      await fetch(`${BASE_URL}/api/inquiries?id=${testInquiryId}`, {
        method: 'DELETE'
      });
      console.log('Cleaned up test lead:', testInquiryId);
    }

    if (res.ok && data.success && foundTestLead) {
      console.log('✅ PASSED: Verified end-to-end persistence and retrieval in Neon inquiries table!\n');
      passed++;
    } else {
      console.error('❌ FAILED: Could not find inserted test lead in Neon inquiries\n');
      failed++;
    }
  } catch (err) {
    console.error('❌ FAILED: Query inquiries exception:', err.message, '\n');
    failed++;
  }

  console.log('====================================================');
  console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runE2E();

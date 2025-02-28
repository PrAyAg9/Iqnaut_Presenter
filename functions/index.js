// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createNewUser = functions.https.onRequest(async (req, res) => {
  // Enable CORS if needed:
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST');
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).send('');
  }

  try {
    // Expecting JSON body with name, email, password, and role.
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new user using the Admin SDK
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Save additional data (role) in Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      name,
      email,
      role,
    });

    return res.status(200).json({ uid: userRecord.uid });
  } catch (error) {
    console.error("Error creating new user:", error);
    return res.status(500).json({ error: error.message });
  }
});

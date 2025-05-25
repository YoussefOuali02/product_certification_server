exports.getDashboardURL = async (req, res) => {
  const role = req.user.role;
  const target = req.query.target; // e.g., 'TC' or 'CertificationProcess'
  let url = '';

  if (role === 'Admin') {
    // Admin can request any target dashboard
    if (target === 'TC') {
      url = process.env.TC_URL;
    } else if (target === 'CertificationProcess') {
      url = process.env.CP_URL;
    } else {
      return res.status(400).json({ error: 'Invalid target dashboard' });
    }
  } else if (role === 'CertificationProcess') {
    url = process.env.CP_URL;
  } else if (role === 'TC') {
    url = process.env.TC_URL;
  } else {
    return res.status(403).json({ error: 'No dashboard for this role' });
  }

  if (!url) {
    return res.status(500).json({ error: 'Dashboard URL not configured' });
  }

  res.setHeader('Cache-Control', 'no-store');
  res.json({ url });
};

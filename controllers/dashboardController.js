// controllers/dashboardController.js
exports.getDashboardURL = async (req, res) => {
    const role = req.user.role;
    let url = '';
  
    if (role === 'CertificationProcess') {
      url = process.env.QLIK_URL_FULL;
    } else if (role === 'TC') {
      url = process.env.QLIK_URL_TC;
    } else {
      return res.status(403).json({ error: 'No dashboard for this role' });
    }
  
    res.json({ url });
  };
  
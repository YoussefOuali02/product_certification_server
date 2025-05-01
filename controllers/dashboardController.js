// controllers/dashboardController.js
exports.getDashboardURL = async (req, res) => {
    const role = req.user.role;
    let url = '';
  
    if (role === 'CertificationProcess') {
      url = process.env.CP_URL;
    } else if (role === 'TC') {
      url = process.env.TC_URL;
    } else {
      return res.status(403).json({ error: 'No dashboard for this role' });
    }
  
    res.json({ url });
  };
  
const db = require('../db');

exports.getAllCustomers = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const query = `SELECT * FROM users LIMIT ? OFFSET ?`;
  db.query(query, [parseInt(limit), parseInt(offset)], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

exports.getCustomerById = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT u.*, COUNT(o.id) AS totalOrders
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id
    WHERE u.id = ?
    GROUP BY u.id
  `;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0)
      return res.status(404).json({ error: 'Customer not found' });

    res.json(results[0]);
  });
};

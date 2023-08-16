const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const PORT = 3004;

server.use(middlewares)
server.use(jsonServer.bodyParser);

server.get('/tasks', (req, res) => {
  const { q } = req.query;
  console.log('qqqqqq--->>>', q);
  const tasks = router.db.get('tasks').value();

  if (q) {
    const results = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(q.toLowerCase()) ||
        task.description.toLowerCase().includes(q.toLowerCase())
    );
    res.json(results);
  } else {
    res.json(tasks);
  }
});

server.delete('/tasks', (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  router.db.get('tasks').remove((task) => ids.includes(task.id)).write();
  res.json({ message: 'Posts deleted successfully' });
});

server.use(router)


server.listen(PORT, () => {
  console.log(`JSON Server is running port ${PORT}`)
})
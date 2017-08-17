export default function(server) {
  server.createList('user', 1, 'registered');
  server.createList('post', 10);
}

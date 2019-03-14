exports.linkResolver = function linkResolver(doc) {

  if (doc._meta.type === 'homepage') {
    return '/';
  }
  if (doc._meta.type === 'products') {
    return '/products';
  }
  if (doc._meta.type === 'product') {
    return '/products/' + doc._meta.uid;
  }
  if (doc._meta.type === 'blog_home') {
    return '/blog';
  }
  if (doc._meta.type === 'blog_post') {
    return '/blog/' + doc._meta.uid;
  }
  return '/';
}
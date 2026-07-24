const fs = require('fs');
const path = require('path');

const dirs = [
  'src',
  'src/config',
  'src/controllers',
  'src/routes',
  'src/services',
  'src/middlewares',
  'src/models',
  'src/utils',
  'src/types',
  'src/constants',
  'src/interfaces'
];

dirs.forEach(d => {
  const p = path.join(__dirname, d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

const files = JSON.parse(fs.readFileSync(path.join(__dirname, 'setup.json'), 'utf8'));

Object.keys(files).forEach(f => {
  fs.writeFileSync(path.join(__dirname, f), files[f]);
});

const routeNames = [
  'auth.routes.ts', 'article.routes.ts', 'profile.routes.ts', 
  'comment.routes.ts', 'follow.routes.ts', 'bookmark.routes.ts', 
  'notification.routes.ts', 'search.routes.ts', 'dashboard.routes.ts'
];
routeNames.forEach(name => {
  fs.writeFileSync(path.join(__dirname, 'src/routes', name), "import { Router } from 'express';\nconst router = Router();\n\nexport default router;\n");
});

const serviceNames = [
  'auth.service.ts', 'article.service.ts', 'profile.service.ts',
  'comment.service.ts', 'follow.service.ts', 'bookmark.service.ts', 'notification.service.ts'
];
serviceNames.forEach(name => {
  const base = name.split('.')[0];
  const className = base.charAt(0).toUpperCase() + base.slice(1) + 'Service';
  fs.writeFileSync(path.join(__dirname, 'src/services', name), `class ${className} {\n  // Placeholder\n}\nexport const ${base}Service = new ${className}();\n`);
});

const controllerNames = [
  'auth.controller.ts', 'article.controller.ts', 'profile.controller.ts',
  'comment.controller.ts', 'follow.controller.ts', 'bookmark.controller.ts',
  'notification.controller.ts', 'search.controller.ts', 'dashboard.controller.ts'
];
controllerNames.forEach(name => {
  const base = name.split('.')[0];
  const className = base.charAt(0).toUpperCase() + base.slice(1) + 'Controller';
  fs.writeFileSync(path.join(__dirname, 'src/controllers', name), `import { Request, Response, NextFunction } from 'express';\n\nclass ${className} {\n  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {}\n  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {}\n  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {}\n  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {}\n  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {}\n}\nexport const ${base}Controller = new ${className}();\n`);
});

const pkgPath = path.join(__dirname, 'package.json');
let pkg = {};
if (fs.existsSync(pkgPath)) {
    pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
}
pkg.scripts = {
    ...pkg.scripts,
    "start": "node dist/server.js",
    "dev": "nodemon src/server.ts",
    "build": "tsc"
};
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log('Success!');

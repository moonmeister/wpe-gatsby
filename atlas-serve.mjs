
import { exec } from 'child_process';

const ATLAS_ENV = process.env?.ATLAS_ENV || 'production';

console.log('ATLAS_ENV', ATLAS_ENV);

let child;

if(ATLAS_ENV === 'development') {
  console.log('Running in development mode');
  child = exec('npm run develop', []);
} else {
  console.log('Starting Atlas Production Server');
  child = exec('npm run serve', []);
}

child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);



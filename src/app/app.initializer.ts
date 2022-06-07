import { AuthService } from './auth/services/auth.service';

export function appInitializer(_auth: AuthService) {
  return () =>
    new Promise((resolve, reject) => {
      _auth.autoLogin().subscribe(
        () => {
          resolve(1);
        },
        (err) => {
          resolve(1);
        }
      );
    });
}

import { HttpRequest, HttpHandlerFn, HttpEvent, HttpEventType } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export function configureLogging(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log(req.url);
  return next(req).pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      console.log(req.url, 'returned a response with status', event.status);
    }
  }));
}

export function configureAuthentication(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const newReq = req.clone({
    withCredentials: true
  });
  return next(newReq);
}

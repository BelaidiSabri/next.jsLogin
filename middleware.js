import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;


export default function middleware(req) {
  const  {cookies}  = req
  const jwt = cookies.theToken
  console.log('cookies', cookies);
  console.log('jwt', jwt);
  
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (jwt===undefined){
      return NextResponse.rewrite(new URL('/', req.url))
    }
    try {
      verify(jwt, secret);
      // Token is valid, allow access to the dashboard
      return NextResponse.next();
    } catch (error) {
        return NextResponse.rewrite(new URL('/', req.url))
    }
  }
  return NextResponse.next();
}





/* export function middleware(req) {
  const { cookies } = req;
  const jwt = cookies.theToken
  const url =req.url
  console.log('cookies', cookies);
  console.log('jwt',jwt);

  if (url.includes('/dashboard')) {
    if (jwt===undefined) {
      // Redirect to login page or unauthorized page
      return NextResponse.redirect('/');

    }
    try {
      verify(jwt, secret);
      // Token is valid, allow access to the dashboard
      return NextResponse.next();
    } catch (error) {
      // Token verification failed, redirect to login page or unauthorized page
      return NextResponse.redirect('/');
    }
  }
  return NextResponse.next();
}
 */
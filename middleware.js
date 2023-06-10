import { verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server';




export default async function middleware(req) {
  const secret = process.env.JWT_SECRET;
  const token = await req.cookies.get('theToken')?.value
  console.log('jwt', token);
  
  if (req.nextUrl.pathname.startsWith('/dashboard')) {

    if (!token){
      return NextResponse.rewrite(new URL('/', req.url))
    }
    try {
      const test = 'passed by try'
      const payload = verify(token, secret);
      console.log('payload',test);
      // Token is valid, allow access to the dashboard
      return NextResponse.next();
    } catch (error) {
        const test = 'passed by catch'
        console.log('payload',test);
        return NextResponse.rewrite(new URL('/home', req.url))
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
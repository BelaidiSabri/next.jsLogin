
import { NextResponse } from 'next/server';
import { verifyAuth } from './utils/auth';




export default async function middleware(req) {
  const token = await req.cookies.get('theToken')?.value
  console.log('jwt', token);
  const verifiedtoken =token&&(await verifyAuth(token).catch((err)=>console.log(err)))

  if (req.nextUrl.pathname === '/') {
    if (!verifiedtoken) {
      return NextResponse.redirect(new URL('/LoginForm', req.url));
    }
    // Redirect to the dashboard if the person is authenticated
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/dashboard') && !verifiedtoken){
    return NextResponse.redirect(new URL('/LoginForm',req.url))
  }
  if (req.url.includes('/LoginForm')&& verifiedtoken){
    return NextResponse.redirect(new URL('/dashboard',req.url))
  }
}

/* 

  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const payload =verify(token,process.env.JWT_SECRET);
    console.log(payload);

    if (!verifiedtoken){
      return NextResponse.rewrite(new URL('/', req.url))
    }
    try {
      const test = 'passed by try'
     // verify(token,process.env.JWT_SECRET);
      // Token is valid, allow access to the dashboard
      return NextResponse.next();
    } catch (error) {
        const test = 'passed by catch'
        console.log('payload',test);
        return NextResponse.rewrite(new URL('/home', req.url))
    }
  }
  return NextResponse.next();
} */





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
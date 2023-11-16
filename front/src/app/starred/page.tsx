// import * as React from 'react';
// import Container from '@mui/material/Container';
import { Suspense } from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

import clientPromise from '../api/mongodb';
import { currentUser } from '@clerk/nextjs';

async function CheckConnection() {
  let isConnected: boolean = false;

  try {
    await clientPromise;

    isConnected = true;
  } catch(e) {
    console.log(e);
  }

  return (
    <div>        
        {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}
    </div>
  )
}

async function DisplayUser() {
  const user = await currentUser();

  return (
  <div>
    {user ? (
      <>
        <span>First Name: {user.firstName}</span><br />
        <span>Last Name: {user.lastName}</span>
      </>
    ) : (
      <span>You are not signed in</span>
    )}
  </div>
  );
}

export default async function Page() {
  return (
    <div>
      <Suspense fallback={<span>Checking connection...</span>}>
        {/* @ts-expect-error Server Component */}
        <CheckConnection />
      </Suspense>
      <Suspense fallback={<span>Checking login...</span>}>
        {/* @ts-expect-error Server Component */}
        <DisplayUser />
      </Suspense>
    </div>
  )
}


// export default function StarredPage() {
//   return (
//     <Container>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Typography variant="body1" gutterBottom>
//           Starred Page
//         </Typography>
//       </Box>
//     </Container>
//   );
// }

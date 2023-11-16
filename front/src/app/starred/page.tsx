// import * as React from 'react';
// import Container from '@mui/material/Container';
import { Suspense } from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

import clientPromise from '../api/mongodb';

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

export default function Page() {
  return (
    <div>
      <Suspense fallback={<span>Checking connection...</span>}>
        {CheckConnection()}
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

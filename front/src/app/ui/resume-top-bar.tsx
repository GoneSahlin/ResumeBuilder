'use client'
 
import { useRouter } from 'next/navigation'
import { Box, Button, ButtonGroup, Select } from "@mui/material";

export default function ResumeTopBar({resumeNames}:{resumeNames: Array<string>}) {
  const router = useRouter();

  return (
    <Box>
      <ButtonGroup>
        {resumeNames.map((resumeName) => {
          return (
            <Button key={resumeName}>{resumeName}</Button>
          );
        })}
      </ButtonGroup>
      <Button type="button" onClick={() => router.push('/new-resume')}>New</Button>
      {/* <DeleteResumeMenu /> */}
    </Box>
  )
}
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <p className="text-5xl text-center mb-8">404 Page Not Found</p>
      <Button component={Link} to="/" variant="contained" style={{ backgroundColor: '#f27d42', color: '#022444' }}>
        Go back to Home
      </Button>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { IconEye } from '@tabler/icons-react';
import { Container, Typography, Badge, Box, CircularProgress } from '@mui/material';
import { localServer } from '@/services/api.service';

const SERVER_URL = localServer;

const Visitantes = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('Disconnected');
  const [socketId, setSocketId] = useState<string | undefined>('');
  const [connectedUsers, setConnectedUsers] = useState<number>(0);

  useEffect(() => {
    const newSocket = io(SERVER_URL);

    setSocket(newSocket);

    newSocket.on('connect', () => {
      setConnectionStatus('Connected');
      setSocketId(newSocket.id);
      console.log('Connected to the server with socket ID:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      setConnectionStatus('Disconnected');
      setSocketId('');
      console.log('Disconnected from the server');
    });

    newSocket.on('connectedUsers', (count: number) => {
      setConnectedUsers(count);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return (
      <Box display="flex" alignItems="center">
          <IconEye size={32} style={{ color: '#1976d2', marginRight: '8px' }} />
          <Typography variant="h4" component="div">
            Visitantes:
            <Box component="span" sx={{ ml: 2 }}>
              <Badge
                badgeContent={connectedUsers}
                color="primary"
                sx={{ fontSize: '1.2em' }}
              />
            </Box>
          </Typography>
      </Box>
  );
};

export default Visitantes;

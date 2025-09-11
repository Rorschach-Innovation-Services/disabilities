import React, { useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAxios } from '../../hooks/axios';
import { Shell } from '../../components/shell';

export const CompanyUsers = () => {
  const { companyID } = useParams();
  const { execute, response, error, loading } = useAxios({
    url: `/company/${companyID}/users`,
    method: 'get',
  });

  useEffect(() => {
    execute();
  }, [companyID]);

  const users = response?.users || [];

  return (
    <Shell heading={`Company Users`}>
      <Container sx={{ padding: '0 !important' }}>
        {error && (
          <Typography color="error">{error.data?.message || 'Failed to load users'}</Typography>
        )}
        {loading && <Typography>Loading...</Typography>}
        {!loading && !error && (
          <List>
            {users.map((u) => (
              <ListItem key={u.id} divider>
                <ListItemText primary={`${u.name || u.email}`} secondary={`${u.role} • ${u.email}`} />
              </ListItem>
            ))}
            {users.length === 0 && (
              <Typography sx={{ mt: 2 }}>No users found for this company.</Typography>
            )}
          </List>
        )}
      </Container>
    </Shell>
  );
};


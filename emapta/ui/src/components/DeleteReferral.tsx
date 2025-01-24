'use client';

import useDeleteApi from '@/providers/referral/hooks/useDeleteApi';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { memo } from 'react';
import { toast } from 'sonner';

type Props = {
  id: number;
};

const DeleteReferral = ({ id }: Props) => {
  const { deleteApi } = useDeleteApi();

  const onDelete = async () => {
    const response = await deleteApi(id);
    if (response) toast.success(response.message);
  };

  return (
    <IconButton size="small" aria-label="delete" onClick={onDelete}>
      <DeleteIcon />
    </IconButton>
  );
};

export default memo(DeleteReferral);

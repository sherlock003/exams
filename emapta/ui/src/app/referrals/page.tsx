'use client';

import DeleteReferral from '@/components/DeleteReferral';
import useGetListApi from '@/providers/referral/hooks/useGetListApi';
import { Referral } from '@/types/referrals';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';

export default function Page() {
  const { getListApi, data: response } = useGetListApi();

  useEffect(() => {
    void getListApi();
  }, [getListApi]);

  const data = useMemo(() => response?.data ?? [], [response?.data]);

  const columns = useMemo<ColumnDef<Referral>[]>(
    () => [
      {
        accessorKey: 'id',
        accessorFn: (info) => info.id,
        enableGlobalFilter: false,
        enableColumnFilter: false,
        header: 'GIVEN NAME',
        cell: (info) => <Typography>{info.getValue<string>()}</Typography>,
        size: 80,
      },
      {
        accessorKey: 'firstName',
        accessorFn: (info) => info.firstName,
        enableGlobalFilter: false,
        enableColumnFilter: false,
        header: 'GIVEN NAME',
        cell: (info) => <Typography>{info.getValue<string>()}</Typography>,
        size: 120,
      },
      {
        accessorKey: 'lastName',
        accessorFn: (info) => info.lastName,
        enableGlobalFilter: false,
        enableColumnFilter: false,
        header: 'SURNAME',
        cell: (info) => <Typography>{info.getValue<string>()}</Typography>,
        size: 120,
      },
      {
        accessorKey: 'email',
        accessorFn: (info) => info.email,
        enableGlobalFilter: false,
        enableColumnFilter: false,
        header: 'EMAIL',
        cell: (info) => <Typography>{info.getValue<string>()}</Typography>,
        size: 120,
      },
      {
        accessorKey: 'phone',
        accessorFn: (info) => info.phone,
        enableGlobalFilter: false,
        enableColumnFilter: false,
        header: 'PHONE',
        cell: (info) => <Typography>{info.getValue<string>()}</Typography>,
        size: 120,
      },
      {
        accessorKey: 'actions',
        accessorFn: (info) => info,
        enableGlobalFilter: false,
        enableColumnFilter: false,
        header: 'PHONE',
        cell: (info) => {
          const referral = info.getValue<Referral>();

          return (
            <Stack direction="row" spacing={1}>
              <IconButton
                component={Link}
                href={`/referrals/${referral.id}`}
                size="small"
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>

              <DeleteReferral id={referral.id} />
            </Stack>
          );
        },
        size: 120,
      },
    ],
    [data],
  );

  const table = useReactTable<Referral>({
    data,
    columns,
    state: { columnVisibility: { id: false } },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container sx={{ py: 4 }} maxWidth="md">
      <Box
        mb={2}
        sx={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}
      >
        <Button
          variant="contained"
          color="success"
          LinkComponent={Link}
          href="/referrals/new"
        >
          Add Referral
        </Button>
      </Box>
      <Table size="small" aria-label="simple table">
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  style={{
                    minWidth: header.column.getSize(),
                    color: '#ABABAB',
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

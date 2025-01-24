'use client';

import ReferralProvider, { FormInput, RefProps } from '@/providers/referral';
import useGetApi from '@/providers/referral/hooks/useGetApi';
import useUpdateApi from '@/providers/referral/hooks/useUpdateApi';
import { Referral } from '@/types/referrals';
import { useRouter } from 'next/navigation';
import { use, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const { getApi } = useGetApi();
  const { update } = useUpdateApi();
  const ref = useRef<RefProps>(null);
  const [referral, setReferral] = useState<Referral | undefined>();

  useEffect(() => {
    void getApi(parseInt(id)).then((response) => setReferral(response.data));
  }, [id, getApi]);

  const onSubmit = async (params: FormInput) => {
    const response = await update(parseInt(id), params);
    toast.success(response.message);
    ref.current?.reset();
    router.push('/referrals');
  };

  return <ReferralProvider referral={referral} ref={ref} onSubmit={onSubmit} />;
}

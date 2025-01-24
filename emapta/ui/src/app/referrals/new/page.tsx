'use client';

import ReferralProvider, { FormInput, RefProps } from '@/providers/referral';
import useCreateApi from '@/providers/referral/hooks/useCreateApi';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'sonner';

export default function Page() {
  const router = useRouter();
  const ref = useRef<RefProps>(null);
  const { create } = useCreateApi();

  const onSubmit = async (params: FormInput) => {
    const response = await create(params);
    toast.success(response.message);
    ref.current?.reset();
    router.push('/referrals');
  };

  return <ReferralProvider ref={ref} onSubmit={onSubmit} />;
}

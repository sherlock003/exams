'use client';

import Input from '@/components/Input';
import Section from '@/components/Section';
import SubmitButton from '@/components/SubmitButton';
import UploadButton from '@/components/UploadButton';
import { Referral } from '@/types/referrals';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Breakpoint, Container, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Grid, { GridSize } from '@mui/material/Grid2';
import {
  ForwardedRef,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

export const defaultValues: FormInput = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  home: '',
  street: '',
  suburb: '',
  state: '',
  postCode: '',
  country: '',
};

type Address = {
  home: string;
  street: string;
  suburb: string;
  state: string;
  postCode: string;
  country: string;
};

export type FormInput = Address & {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type Props = {
  referral?: Referral;
  onSubmit: (params: FormInput) => void;
};
export type RefProps = {
  reset: () => void;
};

const sizes: { [key in Breakpoint]?: GridSize | null } = { xs: 12, sm: 6 };

const Provider = forwardRef(
  ({ referral, onSubmit }: Props, ref: ForwardedRef<RefProps>) => {
    const schema = yup.object().shape({
      firstName: yup.string().label('Given name').required(),
      lastName: yup.string().label('Surname').required(),
      email: yup.string().label('Email').email().required(),
      phone: yup.string().label('Phone').required(),
      home: yup.string().label('Home name or #'),
      street: yup.string().label('Street'),
      suburb: yup.string().label('Suburb'),
      state: yup.string().label('State'),
      postCode: yup.string().label('Postcode'),
      country: yup.string().label('Country'),
    });

    const form = useForm<FormInput>({
      mode: 'onSubmit',
      criteriaMode: 'all',
      defaultValues,
      // @ts-ignore: Typescript
      resolver: yupResolver(schema),
    });
    const {
      register,
      formState: { isSubmitted, isValid, errors },
      reset,
      handleSubmit,
    } = form;

    useEffect(() => {
      if (referral) reset(referral);
    }, [referral]);

    useImperativeHandle(ref, () => ({ reset }), []);

    return (
      <FormProvider {...form}>
        <Container sx={{ py: 4 }} maxWidth="md">
          <Typography
            mb={4}
            sx={{ fontWeight: 'bold' }}
            variant="h4"
            component="h4"
          >
            Referral Builder
          </Typography>

          <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <Box mb={2}>
              <Section title="PERSONAL DETAILS">
                <Box py={3}>
                  <Grid container spacing={2}>
                    <Grid size={sizes}>
                      <FormControl fullWidth>
                        <Typography
                          component="label"
                          htmlFor="firstName"
                          color={errors.firstName ? 'error' : '#ABABAB'}
                        >
                          GIVEN NAME*
                        </Typography>
                        <Input
                          id="firstName"
                          fullWidth
                          hasError={Boolean(errors.firstName)}
                          {...register('firstName')}
                        />
                        {errors.firstName && (
                          <Typography mt={0.5} variant="caption" color="error">
                            {errors.firstName.message}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid size={sizes}>
                      <FormControl fullWidth>
                        <Typography
                          component="label"
                          htmlFor="lastName"
                          color={errors.lastName ? 'error' : '#ABABAB'}
                        >
                          SURNAME*
                        </Typography>
                        <Input
                          id="lastName"
                          hasError={Boolean(errors.lastName)}
                          fullWidth
                          {...register('lastName')}
                        />
                        {errors.lastName && (
                          <Typography mt={0.5} variant="caption" color="error">
                            {errors.lastName.message}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid size={sizes}>
                      <FormControl fullWidth>
                        <Typography
                          component="label"
                          htmlFor="email"
                          color={errors.email ? 'error' : '#ABABAB'}
                        >
                          EMAIL*
                        </Typography>
                        <Input
                          id="email"
                          hasError={Boolean(errors.email)}
                          fullWidth
                          {...register('email')}
                        />
                        {errors.email && (
                          <Typography mt={0.5} variant="caption" color="error">
                            {errors.email.message}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid size={sizes}>
                      <FormControl fullWidth>
                        <Typography
                          component="label"
                          htmlFor="phone"
                          color={errors.phone ? 'error' : '#ABABAB'}
                        >
                          PHONE*
                        </Typography>
                        <Input
                          id="phone"
                          hasError={Boolean(errors.phone)}
                          fullWidth
                          {...register('phone')}
                        />
                        {errors.phone && (
                          <Typography mt={0.5} variant="caption" color="error">
                            {errors.phone.message}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </Section>
            </Box>

            <Box mb={2}>
              <Section title="ADDRESS">
                <Box py={3}>
                  <Grid container spacing={2}>
                    <Grid size={sizes}>
                      <FormControl fullWidth>
                        <Typography
                          component="label"
                          htmlFor="home"
                          color={errors.home ? 'error' : '#ABABAB'}
                        >
                          HOME NAME OR #
                        </Typography>
                        <Input
                          id="home"
                          hasError={Boolean(errors.home)}
                          fullWidth
                          {...register('home')}
                        />
                        {errors.home && (
                          <Typography mt={0.5} variant="caption" color="error">
                            {errors.home.message}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid size={sizes}>
                      <FormControl fullWidth>
                        <Typography
                          component="label"
                          htmlFor="street"
                          color={errors.street ? 'error' : '#ABABAB'}
                        >
                          STREET
                        </Typography>
                        <Input
                          id="street"
                          hasError={Boolean(errors.street)}
                          fullWidth
                          {...register('street')}
                        />
                        {errors.street && (
                          <Typography mt={0.5} variant="caption" color="error">
                            {errors.street.message}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid size={sizes}>
                      <FormControl fullWidth>
                        <Typography
                          component="label"
                          htmlFor="suburb"
                          color={errors.suburb ? 'error' : '#ABABAB'}
                        >
                          SUBURB
                        </Typography>
                        <Input
                          id="suburb"
                          hasError={Boolean(errors.suburb)}
                          fullWidth
                          {...register('suburb')}
                        />
                        {errors.suburb && (
                          <Typography mt={0.5} variant="caption" color="error">
                            {errors.suburb.message}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid size={sizes}>
                      <FormControl fullWidth>
                        <Typography
                          component="label"
                          htmlFor="state"
                          color={errors.state ? 'error' : '#ABABAB'}
                        >
                          STATE
                        </Typography>
                        <Input
                          id="state"
                          hasError={Boolean(errors.state)}
                          fullWidth
                          {...register('state')}
                        />
                        {errors.state && (
                          <Typography mt={0.5} variant="caption" color="error">
                            {errors.state.message}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid size={sizes}>
                      <FormControl fullWidth>
                        <Typography
                          component="label"
                          htmlFor="postCode"
                          color={errors.postCode ? 'error' : '#ABABAB'}
                        >
                          POSTCODE
                        </Typography>
                        <Input
                          id="postCode"
                          hasError={Boolean(errors.postCode)}
                          fullWidth
                          {...register('postCode')}
                        />
                        {errors.postCode && (
                          <Typography mt={0.5} variant="caption" color="error">
                            {errors.postCode.message}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid size={sizes}>
                      <FormControl fullWidth>
                        <Typography
                          component="label"
                          htmlFor="country"
                          color={errors.country ? 'error' : '#ABABAB'}
                        >
                          COUNTRY
                        </Typography>
                        <Input
                          id="country"
                          hasError={Boolean(errors.country)}
                          fullWidth
                          {...register('country')}
                        />
                        {errors.country && (
                          <Typography mt={0.5} variant="caption" color="error">
                            {errors.country.message}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </Section>
            </Box>

            <Box mb={2}>
              <Grid container spacing={2}>
                <Grid size={sizes}>
                  <UploadButton variant="contained" fullWidth>
                    UPLOAD AVATAR
                  </UploadButton>
                </Grid>
                <Grid size={sizes}>
                  <SubmitButton
                    type="submit"
                    disabled={isSubmitted && !isValid}
                    variant="contained"
                    fullWidth
                  >
                    {referral ? 'UPDATE REFERRAL' : 'CREATE REFERRAL'}
                  </SubmitButton>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Container>
      </FormProvider>
    );
  },
);

export default memo(Provider);

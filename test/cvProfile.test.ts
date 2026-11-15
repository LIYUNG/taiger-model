import { CvProfileDataSchema } from '../src/api/account';
import { accountContract } from '../src/contract/account';

const oldProfile = {
  personal_information: { nationality: 'Example' },
  professional_experience: [],
  awards: [],
  skills: { computer: [], other: ['A, B'] },
  interests: {}
};

describe('backward-compatible CV Word survey contract', () => {
  it('keeps legacy payloads unchanged and does not synthesize missing new blocks', () => {
    expect(CvProfileDataSchema.parse(oldProfile)).toEqual(oldProfile);
  });
  it('round trips all added blank-template questions and multiline text', () => {
    const profile = {
      ...oldProfile,
      personal_information: {
        ...oldProfile.personal_information,
        full_name: 'Example Person',
        birthday: '01.01.2000',
        email: 'example@example.com'
      },
      cv_education: {
        universities: [
          {
            period: '09/2020 – present',
            institution: 'Example University',
            city: 'City',
            country: 'Country',
            major: 'B.Sc.',
            minor: 'Minor',
            gpa: '3/4.30',
            courses: 'One\n\nTwo',
            special_activities: 'Activity\n'
          },
          { institution: 'Exchange' }
        ],
        senior_high_schools: [{ gsat: '60/75' }],
        junior_high_schools: [{ courses: 'One, Two, Three' }]
      },
      skills: {
        ...oldProfile.skills,
        languages: [
          { name: 'Example', level: 'legacy-level', test_score: '80/100' }
        ]
      },
      cv_other_information: 'Gap explanation\n'
    };
    expect(CvProfileDataSchema.parse(profile)).toEqual(profile);
    expect(
      CvProfileDataSchema.partial().parse({
        cv_education: { universities: [] }
      })
    ).toEqual({ cv_education: { universities: [] } });
  });
  it('rejects malformed additions and strips account privileges', () => {
    expect(
      CvProfileDataSchema.partial().safeParse({
        cv_education: { universities: 'bad' }
      }).success
    ).toBe(false);
    expect(
      CvProfileDataSchema.partial().parse({
        role: 'Admin',
        skills: { languages: [], password: 'ignored' }
      })
    ).toEqual({ skills: { languages: [] } });
  });
});

it('never admits read-only account defaults in updates', () => {
  expect(
    accountContract.updateCvProfile.body!.parse({
      identity_defaults: { full_name: 'Example Person' },
      personal_information: { address: 'Address' }
    })
  ).toEqual({ personal_information: { address: 'Address' } });
});

import { graphql } from 'gatsby';
import React from 'react';

import Button from 'components/shared/button';
import Heading from 'components/shared/heading';
import Layout from 'components/shared/layout';
import SEO from 'components/shared/seo';

const PolishedBy = ({ assignie = undefined }) => {
  if (!assignie) {
    return null;
  }

  return (
    <div className="col-span-5">
      <div className="font-small flex text-sm">
        <div className="grow" />
        <div>Polished by</div>
        <div className="ml-2 mr-2">
          <img
            height="20px"
            alt={assignie.login}
            width="20px"
            src={assignie.avatarUrl}
            style={{
              borderRadius: '20px',
            }}
          />
        </div>
        <div>
          <a href={assignie.url} target="_blank" rel="noreferrer">
            {assignie.login}
          </a>
        </div>
      </div>
    </div>
  );
};

const PolishingPage = ({ data }) => (
  <Layout>
    <div className="container relative mx-auto mt-36">
      <div>
        <Heading
          className="flat-breaks sm:flat-none mx-auto text-center text-[72px] font-bold leading-denser"
          size="3xl"
          tag="h1"
          theme="white"
          asHTML
        >
          Polishing Season 2023
        </Heading>
        <div className="mx-auto max-w-3xl">
          <p className="mt-4 text-center">
            Every product has bugs. More than we can ever fix. Papercuts, usability issues,
            imperfections. We all have a long backlog of fixes and improvements we intend to get to
            someday.
          </p>
          <div className="mt-4 text-center">
            <Button
              to="https://github.com/novuhq/novu/issues/new/choose"
              target="_blank"
              rel="noreferrer"
              size="xs"
              theme="pink-to-yellow-gradient"
            >
              Create new issue
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <ul className="grid max-w-3xl gap-4">
          {data.githubData.rawResult.data.repository.issues.nodes.map((issue) => (
            <li
              key={issue.number}
              className="relative mx-auto w-full rounded-xl p-px after:absolute after:inset-0 after:-z-10 after:rounded-xl after:bg-pink-yellow-gradient after:opacity-0 after:transition-all after:duration-500 after:ease-in-out"
            >
              <div className="mx-auto flex h-full flex-col rounded-xl bg-gray-gradient p-4">
                <div className="flex-flex-col space-y-2">
                  <div className="grid grid-cols-12 text-lg font-medium leading-none">
                    <div className="text-[14px] leading-[22px] text-gray-9">
                      <a
                        style={{
                          display: 'block',
                        }}
                        href={issue.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        #{issue.number}
                      </a>
                    </div>
                    <div className="col-span-9">
                      <a
                        style={{
                          display: 'block',
                        }}
                        href={issue.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {issue.title.split('] ').at(1)}
                      </a>
                    </div>
                    <div className="col-span-2 text-right">
                      <a
                        style={{
                          display: 'block',
                        }}
                        href={issue.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {issue.state === 'CLOSED' ? 'MERGED' : issue.state}
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-1" />
                    <div className="font-small col-span-6 flex grow text-sm">
                      <div>
                        Requested by{' '}
                        <a href={issue.author.url} target="_blank" rel="noreferrer">
                          {issue.author.login}{' '}
                        </a>
                      </div>
                      <div className="ml-2">
                        <img
                          height="20px"
                          alt={issue.author.login}
                          width="20px"
                          src={issue.author.avatarUrl}
                          style={{
                            borderRadius: '20px',
                          }}
                        />
                      </div>
                    </div>
                    <PolishedBy assignie={issue.assignees.nodes.at(0)} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Layout>
);

export const pageQuery = graphql`
  query {
    githubData {
      rawResult {
        data {
          repository {
            issues {
              nodes {
                assignees {
                  nodes {
                    name
                    avatarUrl
                    login
                    url
                  }
                }
                author {
                  avatarUrl
                  login
                  url
                }
                number
                title
                url
                state
              }
            }
          }
        }
      }
    }
  }
`;

export default PolishingPage;

export const Head = () => {
  const pageMetadata = {
    slug: '/polishing/',
    title: 'Polishing Season - Novu',
    description:
      'Polishing season is about turning that “someday” into “today”. It’s about dedicating time to quality work. To replace flaws and friction with polish and delight.',
  };
  return <SEO {...pageMetadata} />;
};

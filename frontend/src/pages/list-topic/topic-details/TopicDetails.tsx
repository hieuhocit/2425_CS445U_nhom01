/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** types */
import { IQuestion, ITopic } from '@/types/definitions';

/** react-router */
import { useParams, useRouteLoaderData } from 'react-router-dom';

/** template */
import TemplateTestPage from '@/pages/template-test/TemplateTest';

export default function TopicDetailsPage() {
  const { topicId } = useParams();

  const { topics, questions } = useRouteLoaderData('root') as {
    questions: IQuestion[] | undefined;
    topics: ITopic[] | undefined;
  };

  const mode = useSelector(themeMode);

  const isDarkMode = mode === 'dark';

  const topicQuestions = questions?.filter((q) => {
    if (Number(topicId) === 0) return true;
    else if (Number(topicId) === 8) return q.required;
    else return q.topic_id === Number(topicId);
  });

  const topic = topics?.find((t) => t.id === Number(topicId));

  return (
    <>
      {topicQuestions && (
        <TemplateTestPage
          isDark={isDarkMode}
          behavior='view'
          questionsData={topicQuestions}
          title={topic?.display as string}
        />
      )}
    </>
  );
}

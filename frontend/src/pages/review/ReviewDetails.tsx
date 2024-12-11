/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** template */
import TemplateTestPage from '../template-test/TemplateTest';

/** react-router */
import { useLocation, useRouteLoaderData } from 'react-router-dom';

/** types */
import { IQuestion } from '@/types/definitions';

export default function ReviewDetailsPage() {
  const { questions } = useRouteLoaderData('root') as {
    questions: IQuestion[] | undefined;
  };

  const location = useLocation();

  const mode = useSelector(themeMode);

  const isDarkMode = mode === 'dark';

  const index = location.state.index;

  return (
    <TemplateTestPage
      path={'/review'}
      index={Number(index)}
      isDark={isDarkMode}
      behavior='view'
      questionsData={questions}
      title={'Ôn tập'}
    />
  );
}

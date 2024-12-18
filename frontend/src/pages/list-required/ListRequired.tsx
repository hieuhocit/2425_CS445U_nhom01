/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** types */
import { IQuestion } from '@/types/definitions';

/** react */
import TemplateTestPage from '../template-test/TemplateTest';

/** react-router */
import { useRouteLoaderData } from 'react-router-dom';

export default function ListRequiredPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const { questions } = useRouteLoaderData('root') as {
    questions: IQuestion[] | undefined;
  };

  const requiredQuestion: IQuestion[] | undefined = questions?.filter(
    (q) => q.required
  );

  return (
    <>
      {requiredQuestion && (
        <TemplateTestPage
          isDark={isDarkMode}
          behavior='view'
          questionsData={requiredQuestion}
          title={'Câu liệt'}
        />
      )}
    </>
  );
}

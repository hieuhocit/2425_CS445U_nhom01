/** styles */
import styles from './Form.module.scss';

/** react */
import { useState } from 'react';

/** types */
import { IAnswer, IQuestion } from '@/types/definitions';

/** icons */
import { FaCheck } from 'react-icons/fa';
import { CiCirclePlus } from 'react-icons/ci';
import { FiDelete } from 'react-icons/fi';

/** DUMMY DATA */
import { topics, licenses, exams, answers as answersData } from '@/data/data';
import { groupBy } from '@/utils/groupBy';

type onSubmit =
  | null
  | ((id: number, data: IQuestion) => void)
  | ((data: IQuestion) => void);

export default function Form({
  isDark,
  question,
  behavior,
  onCancel,
  onSubmit,
}: {
  isDark: boolean;
  question?: IQuestion | null;
  behavior: 'view' | 'update' | 'add';
  onCancel: () => void;
  onSubmit: onSubmit;
}) {
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );

  const [selectedLicenseIds, setSelectedLicenseIds] = useState(
    question?.license_ids || []
  );

  const filteredAnswers = answersData.filter(
    (a) => a.question_id === question?.id
  );

  const [answers, setAnswers] = useState(
    filteredAnswers.length > 0
      ? filteredAnswers
      : [{ text: '', correct: false }]
  );

  // Loại bỏ topic đầu và cuối vì cái topic đầu là câu hỏi cũng thuộc, còn cái cuối là tuỳ thuộc vào required
  const topicList = topics.slice(1, topics.length - 1);

  const examList = groupBy(
    exams.filter((e) =>
      selectedLicenseIds.find((id) => e.license_ids.includes(id))
    ),
    (exam) => exam.license_ids.join(',')
  );

  function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    const image = files?.[0];
    if (!image) return;
    setSelectedImage(image);
  }

  function handleChangeLicense(e: React.ChangeEvent<HTMLInputElement>) {
    const index = selectedLicenseIds.findIndex(
      (i) => i === Number(e.target.value)
    );

    if (index === -1) {
      setSelectedLicenseIds([...selectedLicenseIds, Number(e.target.value)]);
    } else {
      const newArr = selectedLicenseIds.filter((_l, i) => i !== index);
      setSelectedLicenseIds(newArr);
    }
  }

  function handleAddAnswer() {
    setAnswers((prevValue) => [...prevValue, { text: '', correct: false }]);
  }

  function handleDeleteAnswer(index: number) {
    if (answers.length > 1) {
      setAnswers(answers.filter((_, i) => i !== index));
    }
  }

  function handleChangeAnswer(index: number, text?: string, correct?: boolean) {
    let cloneAnswers: IAnswer[] = JSON.parse(JSON.stringify(answers));
    const answer = cloneAnswers.find((_a, i) => i === index);

    if (!answer) return;

    if (text) {
      answer.text = text;
    }
    if (correct) {
      cloneAnswers = cloneAnswers.map((a) => {
        a.correct = false;
        return a;
      });
      answer.correct = correct;
    }
    setAnswers(cloneAnswers);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!onSubmit || behavior === 'view') return;

    const formData = new FormData(e.target as HTMLFormElement);

    // GET DATA
    const image = formData.get('image') as File;
    const text = formData.get('text') as string;
    const tip = formData.get('tip') as string;
    const required = formData.get('required') === 'on' ? true : false;
    const topic_id = Number(formData.get('topic_id'))
      ? Number(formData.get('topic_id'))
      : null;
    const exam_ids = (formData.getAll('exam_ids') as string[]).map((id) =>
      Number(id)
    );

    const answersData = answers.map((a) => {
      let answer_id = null;
      if ('id' in a && a.id) {
        answer_id = a.id;
      }
      let question_id = null;
      if (question && 'id' in question) {
        question_id = question.id;
      }

      return {
        ...a,
        id: answer_id,
        question_id: question_id,
      };
    }) as IAnswer[];

    // assign
    const questionData: IQuestion = {
      image: image,
      text: text,
      tip: tip,
      required: required,
      topic_id: topic_id,
      exam_ids: exam_ids,
      license_ids: selectedLicenseIds,
      answers: answersData,
    };

    if (behavior === 'update') {
      (onSubmit as (id: number, data: IQuestion) => void)(
        (question as IQuestion).id as number,
        questionData
      );
    } else if (behavior === 'add') {
      (onSubmit as (data: IQuestion) => void)(questionData);
    }
  }

  return (
    <form
      method='POST'
      onSubmit={handleSubmit}
      className={`${styles.form} ${isDark ? styles.darkMode : ''}`}
    >
      <div className={styles.inputContainer}>
        <label htmlFor='text'>Tiêu đề</label>
        <textarea
          name='text'
          id='text'
          placeholder='Nhập tiêu đề'
          defaultValue={question?.text || ''}
          disabled={behavior === 'view'}
        ></textarea>
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor='tip'>Hướng dẫn</label>
        <textarea
          name='tip'
          id='tip'
          placeholder='Nhập hướng dẫn'
          defaultValue={question?.tip || ''}
          disabled={behavior === 'view'}
        ></textarea>
      </div>

      <div
        className={`${styles.checkboxContainer} ${
          behavior === 'view' ? styles.disabled : ''
        }`}
      >
        <label htmlFor='required'>Câu liệt</label>
        <input
          type='checkbox'
          name='required'
          id='required'
          placeholder='Nhập hướng dẫn'
          defaultChecked={question?.required || false}
          disabled={behavior === 'view'}
        />
      </div>

      <div
        className={`${styles.options} ${
          behavior === 'view' ? styles.disabled : ''
        }`}
      >
        <label htmlFor='topic_id'>Chủ đề</label>
        <select
          disabled={behavior === 'view'}
          name='topic_id'
          id='topic_id'
          defaultValue={question?.topic_id ? question.topic_id : undefined}
        >
          {topicList.map((t) => (
            <option key={t.id} value={t.id}>
              {t.display}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor=''>Giấy phép</label>
        <div className={styles.checkboxes}>
          {licenses.map((lc) => (
            <div
              key={'license' + lc.id}
              className={`${styles.checkbox} ${
                behavior === 'view' ? styles.disabled : ''
              }`}
            >
              <input
                type='checkbox'
                id={'license' + lc.id}
                name={'license_ids'}
                value={lc.id}
                defaultChecked={question?.license_ids.includes(lc.id)}
                disabled={behavior === 'view'}
                onChange={handleChangeLicense}
              />
              <label htmlFor={'license' + lc.id}>Hạng {lc.code}</label>
            </div>
          ))}
        </div>
      </div>

      {selectedLicenseIds.length > 0 && (
        <div key={123} className={styles.inputContainer}>
          <label htmlFor=''>Đề thi</label>
          {Object.keys(examList).map((key) => {
            const licenseIds = key
              .split(',')
              .filter((id) => selectedLicenseIds.includes(Number(id)))
              .map((id) => Number(id));
            const selectedLicenses = licenses.filter((l) =>
              licenseIds.includes(l.id)
            );

            return (
              <div
                key={licenseIds.join('')}
                className={styles.checkboxesContainer}
              >
                <div className={styles.title}>
                  <p>- Hạng {selectedLicenses.map((l) => l.code).join(', ')}</p>
                </div>
                <div className={styles.checkboxes}>
                  {examList[key].map((e) => (
                    <div
                      key={e.id}
                      className={`${styles.checkbox} ${
                        behavior === 'view' ? styles.disabled : ''
                      }`}
                    >
                      <input
                        type='checkbox'
                        id={'exam' + e.id}
                        name={'exam_ids'}
                        value={e.id}
                        defaultChecked={question?.exam_ids.includes(e.id)}
                        disabled={behavior === 'view'}
                      />
                      <label htmlFor={'exam' + e.id}>
                        {Number(e.title) ? 'Đề số ' : ''}
                        {e.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.inputContainer}>
        <label htmlFor=''>Câu trả lời</label>
        <div className={styles.answers}>
          {answers.map((a, index) => {
            let key = 'answer-' + index;
            if ('id' in a) {
              key = a.id + '';
            }
            return (
              <div key={key} className={styles.answer}>
                <div>
                  <textarea
                    name='answers'
                    placeholder='Nhập câu trả lời'
                    value={a.text}
                    disabled={behavior === 'view'}
                    onChange={(e) => handleChangeAnswer(index, e.target.value)}
                  ></textarea>
                  {behavior !== 'view' && index === answers.length - 1 && (
                    <div className={styles.actions}>
                      <CiCirclePlus
                        onClick={handleAddAnswer}
                        className={styles.icon}
                      />
                    </div>
                  )}
                  {behavior !== 'view' && answers.length > 1 && (
                    <button
                      type='button'
                      onClick={() => handleDeleteAnswer(index)}
                      className={styles.btnDelete}
                    >
                      <FiDelete className={styles.icon} />
                    </button>
                  )}
                </div>
                <label
                  className={`${styles.customRadio} ${
                    behavior === 'view' ? styles.disabled : ''
                  }`}
                >
                  <input
                    type='radio'
                    name='correct'
                    disabled={behavior === 'view'}
                    checked={a.correct}
                    onChange={(e) =>
                      handleChangeAnswer(index, undefined, e.target.checked)
                    }
                  />
                  <span>
                    <FaCheck className={styles.icon} />
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.inputContainer}>
        <label>Hình ảnh</label>
        <input
          className={styles.inputImage}
          id='image'
          name='image'
          type='file'
          onChange={handleChangeImage}
        />
        <label
          className={`${styles.pickImage} ${
            behavior === 'view' ? styles.view : ''
          }`}
          htmlFor='image'
        >
          <ImageCustom
            behavior={behavior}
            imageUrl={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : question?.image
                ? `https://beta.gplx.app/images/questions/${question.image}`
                : null
            }
          />
        </label>
      </div>

      <div className={styles.actions}>
        <button onClick={onCancel} type='button'>
          Huỷ
        </button>
        {behavior !== 'view' && (
          <button type='submit'>
            {behavior === 'add' ? 'Thêm' : 'Cập nhật'}
          </button>
        )}
      </div>
    </form>
  );
}

function ImageCustom({
  behavior,
  imageUrl,
}: {
  behavior: 'view' | 'update' | 'add';
  imageUrl: string | undefined | null;
}) {
  if (behavior === 'view') {
    return imageUrl ? (
      <img src={imageUrl} alt='preview image' />
    ) : (
      <p>Không có hình ảnh</p>
    );
  }
  return imageUrl ? (
    <img src={imageUrl} alt='preview image' />
  ) : (
    <p>Chọn hình ảnh</p>
  );
}

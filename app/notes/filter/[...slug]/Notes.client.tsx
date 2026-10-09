
'use client';

import { useEffect,useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import { Pagination } from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import { NoteForm } from '@/components/NoteForm/NoteForm';
import css from './page.module.css';

type NotesClientProps = {
  tag?: string;
};

export default function NotesClient({
  tag = 'all',
}: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  useEffect(() => {
  setPage(1);
}, [tag]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const perPage = 8;

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, error, isLoading } = useQuery({
    queryKey: [
      'notes',
      { page, perPage, search: debouncedSearch, tag },
    ],
    queryFn: () =>
      fetchNotes({
        page,
        perPage,
        search: debouncedSearch,
        tag,
      }),
    placeholderData: keepPreviousData,
  });

  if (error) {
    return (
      <p className={css.error || ''}>
        Сталася помилка при завантаженні нотаток.
      </p>
    );
  }

  const notesList = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className={css.container || css.notesPage || ''}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          gap: '20px',
          width: '100%',
        }}
      >
        <div style={{ width: '300px' }}>
          <SearchBox
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />
        </div>

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            onPageChange={(selectedPage: number) => {
              setPage(selectedPage);
            }}
            forcePage={page}
          />
        )}

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={css.button || css.createButton || ''}
        >
          Create note +
        </button>
      </div>

      {isLoading ? (
        <p className={css.loading || ''}>
          Завантаження нотаток...
        </p>
      ) : (
        <NoteList notes={notesList} />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
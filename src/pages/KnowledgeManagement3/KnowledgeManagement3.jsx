
//final code of knowledge base for the supportpage
import React, { useState , useEffect} from 'react';
import { Search, Edit, Trash2, X } from 'lucide-react';
import './KnowledgeManagement3.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import KnowledgeAPI from '../../services/KnowledgeAPI';

// ---------------- Article Preview Modal ----------------
const ArticlePreview = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{article.title}</h2>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">
          <p><strong>ID:</strong> {article.id}</p>
          <p><strong>Category:</strong> {article.category}</p>
          <p><strong>Created At:</strong> {article.createdAt}</p>
          <p><strong>Updated At:</strong> {article.updatedAt}</p>
          <hr />
          <p>{article.content}</p>
        </div>
      </div>
    </div>
  );
};

// ---------------- Article Table ----------------
const ArticleTable = ({ articles, onEdit, onDelete, onPreview, searchQuery }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);


   // Handle clicking on page numbers
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="kb-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>CONTENT</th>
              <th>CATEGORY</th>
              <th>CREATED AT</th>
              <th>UPDATED AT</th>
              {/* <th>ACTIONS</th> */}
            </tr>
          </thead>
          <tbody>
            {paginatedArticles.map((article, index) => (
              <tr key={article.id} onClick={() => onPreview(article)} style={{ cursor: 'pointer' }}>
                <td>{startIndex + index + 1}</td>
                <td>{article.title}</td>
                <td>{article.content}</td>
                <td>{article.category}</td>
                <td>{article.createdAt}</td>
                <td>{article.updatedAt}</td>
                {/* <td>
                  <div className="action-buttons">
                    <button onClick={() => onEdit(article)} className="btn-edit">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => onDelete(article.id)} className="btn-delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            &lt;&lt; Previous
          </button>

          <div className="pagination-numbers">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next &gt;&gt;
          </button>
        </div>
      )}
    </div>
  );
};

// ---------------- Main Knowledge Page ----------------
const KnowledgeManagement3 = ({ activePage, setActivePage }) => {
  const [articles, setArticles] = useState([]);
 const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewArticle, setPreviewArticle] = useState(null);

  // const handleEdit = (article) => {
  //   alert(`Edit functionality for ${article.title} is not implemented`);
  // };

  // const handleDelete = (id) => {
  //   if (window.confirm('Are you sure you want to delete this article?')) {
  //     setArticles(articles.filter((a) => a.id !== id));
  //   }
  // };

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const data = await KnowledgeAPI.getAllArticles();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);


  return (
    <div className="tickets-page">
      <Sidebar activeTab={activePage} setActiveTab={setActivePage} />
      <div className="main-content">
        <div className="header">
          <h1 className="page-title">Knowledge Management</h1>
        </div>

        <div className="search-section">
          <div className="search-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="search-input"
            />
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading articles...</div>
        ) : (
          <ArticleTable
            articles={articles}
            onPreview={(article) => setPreviewArticle(article)}
            searchQuery={searchQuery}
          />
        )}

        {previewArticle && (
          <ArticlePreview
            article={previewArticle}
            onClose={() => setPreviewArticle(null)}
          />
        )}
      </div>
    </div>
  );
};

export default KnowledgeManagement3;













//no preview functionlity and edit functionality
// import React, { useState } from 'react';
// import { Search, Edit, Trash2 } from 'lucide-react';
// import './KnowledgeManagement2.css';
// import Sidebar2 from '../../components/Sidebar2/Sidebar2';

// // ---------------- Article Table ----------------
// const ArticleTable = ({ articles, onEdit, onDelete, searchQuery }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const filteredArticles = articles.filter(
//     (article) =>
//       article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       article.id.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <div className="table-container">
//       <div className="table-wrapper">
//         <table className="kb-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>TITLE</th>
//               <th>CONTENT</th>
//               <th>CATEGORY</th>
//               <th>CREATED AT</th>
//               <th>UPDATED AT</th>
//               <th>ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedArticles.map((article, index) => (
//               <tr key={article.id}>
//                 <td>{startIndex + index + 1}</td>
//                 <td className="td-title">{article.id}</td>
//                 <td>
//                   <div className="content-title">{article.title}</div>
//                   <div className="content-desc">{article.content}</div>
//                 </td>
//                 <td>{article.category}</td>
//                 <td>{article.createdAt}</td>
//                 <td>{article.updatedAt}</td>
//                 <td>
//                   <div className="action-buttons">
//                     <button onClick={() => onEdit(article)} className="btn-edit">
//                       <Edit size={18} />
//                     </button>
//                     <button onClick={() => onDelete(article.id)} className="btn-delete">
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {totalPages > 1 && (
//         <div className="pagination">
//           <button
//             onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//             disabled={currentPage === 1}
//             className="pagination-btn"
//           >
//             &lt;&lt; Previous
//           </button>

//           <div className="pagination-numbers">
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>

//           <button
//             onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//             disabled={currentPage === totalPages}
//             className="pagination-btn"
//           >
//             Next &gt;&gt;
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // ---------------- Main Knowledge Page ----------------
// const KnowledgeManagement = ({ activePage, setActivePage }) => {
//   const [articles, setArticles] = useState([
//     {
//       id: 'KB-001',
//       title: 'Troubleshooting Login Issues',
//       content: 'Steps to resolve common user login problems...',
//       category: 'Technical Support',
//       createdAt: '2023-10-26',
//       updatedAt: '2023-11-01'
//     },
//     {
//       id: 'KB-002',
//       title: 'Frequently asked questions about payments...',
//       content: 'Frequently asked questions about payments...',
//       category: 'Billing',
//       createdAt: '2023-10-27',
//       updatedAt: '2023-11-07'
//     },
//     {
//       id: 'KB-003',
//       title: 'Billing & Subscription FAQs for new users...',
//       content: 'Billing & Subscription FAQs for new users...',
//       category: 'Billing',
//       createdAt: '2023-10-27',
//       updatedAt: '2023-11-05'
//     },
//     {
//       id: 'KB-004',
//       title: 'Product Onboarding Guide',
//       content: 'Documentation for integrating with our API',
//       category: 'Getting Started',
//       createdAt: '2023-10-28',
//       updatedAt: '2023-11-05'
//     },
//     {
//       id: 'KB-005',
//       title: 'API Integration Docs',
//       content: 'API Integration Docs',
//       category: 'Developer',
//       createdAt: '2023-10-30',
//       updatedAt: '2023-11-03'
//     }
//   ]);

//   const [searchQuery, setSearchQuery] = useState('');

//   const handleEdit = (article) => {
//     alert(`Edit functionality for ${article.title} is not implemented`);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this article?')) {
//       setArticles(articles.filter((a) => a.id !== id));
//     }
//   };

//   return (
//     <div className="tickets-page">
//       <Sidebar2 activeTab={activePage} setActiveTab={setActivePage} />
//       <div className="main-content">
//         <div className="header">
//           <h1 className="page-title">Knowledge Base</h1>
//         </div>

//         <div className="search-section">
//           <div className="search-wrapper">
//             <Search className="search-icon" size={20} />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search articles..."
//               className="search-input"
//             />
//           </div>
//         </div>

//         <ArticleTable
//           articles={articles}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//           searchQuery={searchQuery}
//         />
//       </div>
//     </div>
//   );
// };

// export default KnowledgeManagement;




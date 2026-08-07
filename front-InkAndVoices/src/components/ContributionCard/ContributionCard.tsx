import './ContributionCard.css';



export default function ContributionCard() {
  return (
    <>
        <div className="contribution-card">
            {/* <Link to={`/book/${book.uuid}`}> */}
                <div className="contribution-datas">
                    <p className="contribution-title">contribution.title</p>
                    <p className="contribution-author">contribution.author</p>
                    <p className="contribution-date">soumis le date</p>
                </div>
            {/* </Link> */}
                <div className="contribution-state-container">
                    <div className="contribution-state">
                        <p> Accepté</p>
                    </div>
                </div>
            </div>
    </>
  );
}

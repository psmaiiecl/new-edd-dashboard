import './index.css'

export function ModuleCard({title, action, children}){
    return (
        <div className="module-card roboto-regular" onClick={action}>
            <div className="module-card__title">
                <span>{title}</span>
            </div>
            <div className="module-card__content">
                {children}
            </div>
        </div>
    );
}
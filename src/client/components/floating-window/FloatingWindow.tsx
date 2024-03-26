import './FloatingWindow.scss';
import Close from '@icons/x.svg';
import { Button } from "@components/button";
import { send } from '@lib/ipc';
import { BaseTemplate } from '@ctypes/template';
import { LoadMessage } from '@components/load-message';
import { useEffect } from 'react';

export default ({ children, onDestroy, template }: { children: any, onDestroy?(): any, template: BaseTemplate & any }) => {

    const { active, footer, config, title } = template;

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onDestroy && onDestroy();
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    return (<>{active &&
        <div className="floating-window-wrapper flex f-center fadein" >
            <div className="floating-window-window panel flex f-col fadeup">
                <header className="floating-window-header flex f-row f-center-h f-between">
                    <p className="frozen"><small><b>{title}</b></small></p>
                    <Button iconLeft={Close} onClick={onDestroy} role='GHOST' />
                </header>
                <div className="floating-window-container flex f-row">
                    {config && children}
                </div>
                <footer className="floating-window-footer flex f-row f-between">
                    <LoadMessage />
                    <div className='flex f-row gap-s'>
                        {footer?.primaryAction && <>
                            <Button value='Cancel' onClick={onDestroy} role='SECONDARY' />
                            <Button
                                value={footer?.primaryAction.value || 'ADD'}
                                onClick={() => {
                                    send({ action: footer?.primaryAction.action || '', payload: { ...template } });
                                    if (footer?.primaryAction.destroy) { onDestroy && onDestroy(); }
                                }}
                                role='PRIMARY'
                            />
                        </>}
                    </div>
                </footer>
            </div>
        </div>}
    </>
    );
}
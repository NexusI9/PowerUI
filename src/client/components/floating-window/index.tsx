import './index.scss';
import Close from '@icons/x.svg';
import { ButtonIcon } from "@components/button-icon";
import { Button } from "@components/button";
import { send } from '@lib/ipc';
import { BaseTemplate } from '@ctypes/template';
import { LoadMessage } from '@components/load-message';

export const FloatingWindow = ({ children, onDestroy, template }: { children: any, onDestroy?(): any, template: BaseTemplate & any }) => {

    const { active, footer, config, title } = template;

    return (<>{active &&
        <div className="floating-window-wrapper flex f-center">
            <div className="floating-window-window panel flex f-col">
                <header className="floating-window-header flex f-row f-center-h f-between">
                    <p className="frozen"><small><b>{title}</b></small></p>
                    <ButtonIcon icon={Close} onClick={onDestroy} />
                </header>
                <div className="floating-window-container flex f-row">
                    {config && children}
                </div>
                <footer className="floating-window-footer flex f-row f-between">
                    <LoadMessage />
                    <div className='flex f-row gap-s'>
                        <Button value='Cancel' onClick={onDestroy} role='SECONDARY' />
                        <Button
                            value={footer?.primaryAction.value || 'ADD'}
                            onClick={() => {
                                send({ action: footer?.primaryAction.action || '', payload: { ...template } });
                                if(footer?.primaryAction.destroy){ onDestroy && onDestroy(); }
                            }}
                            role='PRIMARY'
                        />
                    </div>
                </footer>
            </div>
        </div>}
    </>
    );
}
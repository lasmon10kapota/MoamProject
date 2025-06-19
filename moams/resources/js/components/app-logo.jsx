import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-sm">
                <AppLogoIcon className='size-7 rounded-sm fill-current' />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm overflow-hidden">
                <span className="mb-0.5 truncate leading-none font-semibold">MOAMS</span>
            </div>
        </>
    );
}

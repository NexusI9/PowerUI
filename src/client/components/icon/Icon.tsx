export default ({ icon }: { icon: string; }) => {
    const DynamicIcon = typeof icon === 'function' ? icon : require(`@icons/${icon}.svg`).default;
    return (<DynamicIcon />);
}
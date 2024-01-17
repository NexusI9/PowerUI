export function colorSynthax(color: Array<string>, synthax: string, prefix?: string): string {
    return {
        'Separator •': color.join(' • '),
        'Separator -': color.join(' - '),
        'Separator |': color.join(' | '),
        'Separator /': color.join(' / '),
        'White space': color.join(' '),
        'Development': prefix ? `${prefix}(${color.join(', ')})` : color.join(', ')
    }[synthax] || color.join(' ');
}
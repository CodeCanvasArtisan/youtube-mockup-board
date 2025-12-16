export function createTitleCutoffString(title, cutoffNumber) {
    // return the plain title if there's no problems
    if(title.length <= cutoffNumber) {
        return title;
    }

    const titleByWord = title.split(" ");
    console.log("TITLE WORD ARRAY -> ", titleByWord);
    
    // find the indexes of the spaces
    const spaceIndexes = [];
    for(let i = 0; i < title.length; i++) {
        if(title[i] == " ") {
            spaceIndexes.push(i);
        }
    }
    console.log("indexes wehre the spaces are -> ", spaceIndexes);

    // get the spaces before the cutoff
    const spacesBeforeCutoff = spaceIndexes.filter(i => i <= cutoffNumber);

    // find the largest of those (closest to the cutoff)
    const closestSpaceIndex = spacesBeforeCutoff[spacesBeforeCutoff.length-1];
    console.log("CLOSEST SPACE INDEX IS ", closestSpaceIndex, ".\n CUTOFF IS ", cutoffNumber);

    const lenience = 10;

    // if a space is more than 10 chars away, cut mid-word, otherwise cut at space
    let formattedTitle;
    if(cutoffNumber - closestSpaceIndex >= lenience) {
        formattedTitle = title.slice(0, cutoffNumber);

    } else  {
        formattedTitle = title.slice(0, closestSpaceIndex);

    }
    
    // return title with ...
    return `${formattedTitle} ...`;

    
}
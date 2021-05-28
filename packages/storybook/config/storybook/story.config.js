const { execSync } = require('child_process');

let outputChangedComponentPackages;

const getChangedPackageStories = () => {
    try {
        outputChangedComponentPackages = execSync('npx lerna ls --since origin/master --json'); 
    } catch (error) {
        console.info('No changed component packages found.');
        process.exit(0);
    }
    
    const changedPackagesArray = JSON.parse(outputChangedComponentPackages.toString());
    
    const changedComponentPackages = changedPackagesArray
        .filter(pkg => pkg.location.match(new RegExp('packages/components')));

    
    let storyPaths = [];
    
    changedComponentPackages.forEach(package => storyPaths.push(`${package.location}/stories/*.stories.@(js|mdx)`));

    return storyPaths;
}

module.exports = {
    getChangedPackageStories
};

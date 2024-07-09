import React from 'react';

interface ContestDescrProps {}

const ContestDescr: React.FC<ContestDescrProps> = () => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">What is this contest about?</h2>
            <p className="text-gray-700">
                {`Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, voluptates. Dolore pariatur cum alias voluptatibus deleniti suscipit rerum ad et eveniet quos maiores cupiditate laudantium, a sit esse sequi quaerat?
                Deserunt neque delectus cupiditate, nobis minima illo aspernatur atque sint, eveniet hic quod optio ab dolore, reprehenderit facilis! Id natus repellat dolores ipsa doloremque earum error eligendi beatae ratione nam.
                Voluptatum aliquid ducimus autem sunt expedita, reprehenderit facilis provident nulla omnis tempore. Ipsam, maiores. Nulla, provident laboriosam voluptatibus alias cum delectus ullam, quam nobis, vero consectetur eius religendi unde nisi.
                Similique iste enim optio? Minus doloribus dolores non fugit consequuntur voluptatem, ipsum aspernatur alias eum placeat repellat qui ea consectetur debitis provident in ad dignissimos maiores dolorem molestias itaque. Itaque?
                Praesentium beatae exercitationem sit quisquam quasi recusandae eius accusantium, natus voluptas placeat animi labore repudiandae quos. Temporibus, provident id alias odit minima magni autem fuga blanditiis ad, quod sed ab!
                Sint totam voluptate, sed natus architecto ipsam numquam, unde et soluta beatae aliquam placeat assumenda consequuntur earum sequi quidem. Accusamus explicabo delectus error dolores facere atque temporibus at est aliquid?
                Quaerat ipsum suscipit rem cupiditate, deleniti facilis fugit aspernatur, explicabo ipsa vero alias officia labore velit libero nesciunt maiores cum enim maxime? Labore nisi, obcaecati dolorum eveniet aperiam alias? Officiis.`}
            </p>
        </div>
    );
};

export default ContestDescr;
